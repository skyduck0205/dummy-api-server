const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const DummyRouter = require('./dummy-router');

const DB = path.join(__dirname, process.env.DB || '../db/db.json');
const PUBLIC_PATH = path.join(__dirname, '../public');
const DS_PREFIX = process.env.DS_PREFIX || '/_ds';

const app = express();

/**
 * Initialize DB
 */
const db = low(new FileSync(DB));
db.defaults({ apis: [] })
  .write();

/**
 * Initialize router
 */
const router = new DummyRouter(db.get('apis').cloneDeep().value());

/**
 * Server config
 */
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.static(PUBLIC_PATH));

/**
 * Dummy Server APIs
 */
app.route(`${DS_PREFIX}/apis`)
  .get((req, res) => res.send({ // get api list
    code: 1,
    message: 'Dummy API Server: List API successfully',
    data: db.get('apis').value()
  }));

app.route(`${DS_PREFIX}/apis/:apiID/current`)
  .put((req, res) => { // update api current response
    const { params, body } = req;

    const api = db.get('apis').find({ id: params.apiID });
    if (!api.value()) {
      return res.status(404).send({
        code: 0,
        message: 'Dummy API Server: API not found!'
      });
    }

    api.assign({ currentResponseID: body.responseID })
      .write();

    res.send({
      code: 1,
      message: 'Dummy API Server: Update API response successfully',
      data: api.value()
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
  res.status(response.status).send(response.body);
});

module.exports = app;
