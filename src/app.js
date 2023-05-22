const express = require('express')
const bodyParser = require('body-parser')
const routeHandler = require("./route");
const handleError = require('./common/error-handler');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

routeHandler(app);

app.use(async (err, req, res, _next) => {
  await handleError(err, req, res);
});

module.exports = app;
