const proxy = require('http-proxy');
  app = require('./app');

const proxyServer = proxy.createProxyServer({
  target: process.env.PROXY_TARGET || 'http://localhost:6000',
});

module.exports = proxyServer;
