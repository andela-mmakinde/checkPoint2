require('dotenv').config();

module.exports = {
  development: {
    username: 'andeladeveloper',
    password: null,
    database: 'DMS',
    host: '127.0.0.1',
    dialect: 'postgres'
  },

  test: {
    // use_env_variable: 'dmsTest',
    // dialect: 'postgres',
    username: 'andeladeveloper',
    password: null,
    database: 'DMS_TESTS',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },

  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  }
};
