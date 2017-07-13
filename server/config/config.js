const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'andeladeveloper',
    password: null,
    database: 'DMS',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'dmsTest',
    logging: 'false',
    dialect: 'postgres'
  },
  production: {
    username: 'andeladeveloper',
    password: null,
    database: 'DMS',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
