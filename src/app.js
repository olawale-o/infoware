const express = require('express')
const bodyParser = require('body-parser')
const { createProxyMiddleware } = require('http-proxy-middleware')
const routeHandler = require("./route");
const handleError = require('./common/error-handler');

const app = express();
const filter = function (pathname, req) {
  return pathname.match('^/api/employees') && req.method === 'GET';
}
const proxyOptions = {
  target: 'http://localhost:6000',
  changeOrigin: true,
  pathRewrite: {
    '^/api/employees': '/api/v1/employees',
  },
  router: {
    'localhost:5000': 'http://localhost:5000',
  },
  onError: (err, req, res, target) => {
    console.log("err", err);
  },
  onProxyReq: (proxyReq, req, res) => {
    if (req.body) {
      let bodyData = JSON.stringify(req.body);
      // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
      proxyReq.setHeader('Content-Type','application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      // stream the content
      proxyReq.write(bodyData);
    }
  },
};
const proxy = createProxyMiddleware(filter, proxyOptions);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/employees', proxy);

routeHandler(app);

app.use(async (err, req, res, _next) => {
  await handleError(err, req, res);
});

module.exports = app;
