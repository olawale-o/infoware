const config = require('../../config');
module.exports = {
  development: {
    username: config.get('db.username'),
    password: config.get('db.password'),
    database: config.get('db.name'),
    host: config.get('db.host'),
    port: config.get('db.port'),
    dialect: "mysql2"
  },
}
