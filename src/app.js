const express = require('express')
const bodyParser = require('body-parser')
const routeHandler = require("./route");
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

routeHandler(app);

module.exports = app;
