const proxy = require('http-proxy');
  app = require('./app');

const proxyServer = proxy.createProxyServer({
  target: 'http://localhost:6000',
});

module.exports = proxyServer;
