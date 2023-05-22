const config = require('./config.js');
const db = require("./src/models");

const app = require('./src/app.js');

const port = config.get('port') || 6000

db.sequelize.sync()
  .then(() => {
    if (config.get('env') !== 'test') {
      console.log("Synced db.");
    }
  })
  .catch((err) => {
    if (config.get('env') !== 'test') {
      console.log("Failed to sync db: " + err.message);
    }
  })

if (config.get('env') !== 'test') {
  app.listen(port, () => {
    console.log(`Running on port ${config.get('port')}`);
  });
}

module.exports = app;