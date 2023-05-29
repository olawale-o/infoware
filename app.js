const express = require('express');

const proxy = require('./middleware-proxy');
const app = express();

app.use('/api', proxy);

module.exports = app;
