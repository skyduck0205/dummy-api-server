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
app.route(`${DS_PREFIX}/api`)
  // get api list
  .get((req, res) => res.send(db.get('apis').value()));

module.exports = app;
