const { createProxyMiddleware } = require('http-proxy-middleware')

const filter = function (pathname, req) {
  return pathname.match('^/api/employees');
}
const proxyOptions = {
  target: process.env.PROXY_TARGET || 'http://localhost:6000',
  changeOrigin: true,
  pathRewrite: {
    '^/api/employees': '/api/v1/employees',
  },
  router: {
    'localhost:5000': process.env.PROXY_TARGET || 'http://localhost:6000',
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

module.exports = proxy;
