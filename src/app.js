const express = require('express')
const bodyParser = require('body-parser')
const routeHandler = require("./src/route");
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

routeHandler(app);

module.exports = app;
