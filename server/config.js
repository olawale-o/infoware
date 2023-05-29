const convict = require('convict');

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 6000,
    env: 'PORT',
    arg: 'port',
  },
  db: {
    host: {
      doc: 'Database host name',
      format: '*',
      default: 'localhost',
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 3307,
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'infoware',
    },
    user: {
      doc: 'Database user',
      name: {
        doc: 'Database username',
        format: String,
        default: 'root',
      },
      password: {
        doc: 'Database password',
        format: String,
        default: '',
      },
    }
  },
});

const env = config.get('env');
config.loadFile(`./src/config/${env}.json`);

config.validate({ allowed: 'strict' });

module.exports = config;