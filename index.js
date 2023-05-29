// const app = require('./app');

// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server is up on port ${port}`);
// });

// module.exports = app;

const proxy = require('http-proxy');

proxy.createProxyServer({
  target: 'http://localhost:6000',
}).listen(5000);
