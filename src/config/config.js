const config = require('../../config');
module.exports = {
  development: {
    username: config.get('db.user.name'),
    password: config.get('db.user.password'),
    database: config.get('db.name'),
    host: config.get('db.host'),
    dialect: "mysql"
  },
  test: {
    username: config.get('db.user.name'),
    password: config.get('db.user.password'),
    database: config.get('db.name'),
    host: config.get('db.host'),
    dialect: "mysql"
  },
}
