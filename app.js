const express = require('express');

const proxy = require('./middleware-proxy');
const app = express();

app.use('/api/employees', proxy);

module.exports = app;
