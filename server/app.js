const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const DB_PATH = path.join(__dirname, process.env.DB || '../db/db.json');
const PUBLIC_PATH = path.join(__dirname, '../public');

const app = express();

// Initialize DB
const db = low(new FileSync(DB_PATH));
db.defaults({})
  .write();

// Server config
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.static(PUBLIC_PATH));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

module.exports = app;
