const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('ds:app');
const _ = require('lodash');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const normalizePath = require('../utils/normalizePath');
const genId = require('../utils/genId');
const DummyRouter = require('./dummy-router');

const DB = path.join(__dirname, process.env.DB || '../db/db.json');
const DB_NAME = path.basename(DB);
const PUBLIC_PATH = path.join(__dirname, '../web/build');
const DS_PREFIX = process.env.DS_PREFIX || '/_ds';

const app = express();

/**
 * Initialize DB
 */
const db = low(new FileSync(DB));
db.defaults({ config: { name: DB_NAME, delay: 0 }, apis: [] })
  .write();

/**
 * Initialize router
 */
const router = new DummyRouter(db.get('apis').cloneDeep().value());

/**
 * Server config
 */
app.use(logger('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.static(PUBLIC_PATH));

/**
 * Dummy Server APIs
 */
app.route(`${DS_PREFIX}/db`)
  .get((req, res) => res.send(db.value()));

app.route(`${DS_PREFIX}/config`)
  .get((req, res) => res.send({
    code: 1,
    message: 'Dummy API Server: Get config successfully',
    data: db.get('config').value()
  }))
  .patch((req, res) => {
    const { body } = req;
    const dbConfig = db.get('config');

    // update db
    dbConfig.assign(body)
      .write();

    res.send({
      code: 1,
      message: 'Dummy API Server: Patch config successfully',
      data: dbConfig.value()
    });
  });

app.route(`${DS_PREFIX}/apis`)
  // get api list
  .get((req, res) => res.send({
    code: 1,
    message: 'Dummy API Server: List API successfully',
    data: db.get('apis').value()
  }))
  // create a new api
  .post((req, res) => {
    const { body } = req;

    const dbAPIs = db.get('apis');

    // check normalized path
    body.id = genId();
    body.disabled = false;
    body.normalizedPath = normalizePath(body.path);
    const conflict = dbAPIs
      .find({
        method: body.method,
        normalizedPath: body.normalizedPath,
      })
      .value();

    // 409 if has conflict with other APIs
    if (conflict) {
      debug('API already exists', conflict);
      return res.status(409).send({
        code: 0,
        message: `Dummy API Server: API path conflicts with ${conflict.method} ${conflict.path}`
      });
    }

    // update db
    const newAPI = dbAPIs.push(body)
      .write();

    // update router
    router.apis = dbAPIs.cloneDeep().value();
    router.updatePatterns();

    res.send({
      code: 200,
      message: 'Dummy API Server: Create API successfully',
      data: newAPI
    });
  });

app.route(`${DS_PREFIX}/apis/:apiID`)
  // update api
  .patch((req, res) => {
    const { params, body } = req;

    // check if api exists
    const dbAPIs = db.get('apis');
    const dbAPI = dbAPIs.find({ id: params.apiID });
    const api = dbAPI.value();
    if (!api) {
      return res.status(404).send({
        code: 0,
        message: 'Dummy API Server: API not found!'
      });
    }

    // if api path or method is changed
    if (
      (body.path && body.path !== api.path) ||
      (body.method && body.method !== api.method)
    ) {
      debug('API path changed', api.path, '=>', body.path);
      // check normalized path
      body.normalizedPath = normalizePath(body.path);
      const conflict = dbAPIs
        .find({
          method: body.method,
          normalizedPath: body.normalizedPath,
        })
        .value();

      // 409 if has conflict with other APIs
      if (conflict && conflict.id !== params.apiID) {
        debug('API already exists', conflict);
        return res.status(409).send({
          code: 0,
          message: `Dummy API Server: API path conflicts with ${conflict.method} ${conflict.path}`
        });
      }
    }

    // update db
    dbAPI.assign(body)
      .write();

    // update router
    router.apis = dbAPIs.cloneDeep().value();
    router.updatePatterns();

    res.send({
      code: 1,
      message: 'Dummy API Server: Patch API successfully',
      data: api
    });
  })
  // delete api
  .delete((req, res) => {
    const { params, body } = req;

    // check if api exists
    const dbAPIs = db.get('apis');
    const api = dbAPIs.find({ id: params.apiID }).value();
    if (!api) {
      return res.status(404).send({
        code: 0,
        message: 'Dummy API Server: API not found!'
      });
    }

    // update db
    dbAPIs.remove({ id: params.apiID })
      .write();

    // update router
    router.apis = dbAPIs.cloneDeep().value();
    router.updatePatterns();

    res.send({
      code: 200,
      message: 'Dummy API Server: Delete API successfully',
      data: api
    });
  });

/**
 * Dummy APIs
 */
app.all('*', (req, res) => {
  // match path with request object
  const { method, path, query } = req;
  const response = router.getCurrentResponse(method, path, query);
  if (!response) {
    return res.status(404).send({
      code: 0,
      message: 'Dummy API Server: API not found!'
    });
  }
  // get response delay
  const configDelay = db.get('config.delay').value();
  const apiDelay = response.delay;
  const delay = _.isInteger(apiDelay) ? apiDelay : configDelay;
  setTimeout(() => {
    res.status(response.status).send(response.body);
  }, _.isInteger(delay) ? delay : 0);
});

module.exports = app;
