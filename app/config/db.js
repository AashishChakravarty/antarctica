module.exports = {
  development: {
    user: 'root',
    password: '',
    database: 'antarctica',
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    logging: true,
    pool: {
      max: 5,
      min: 1,
      idle: 30000,
    },
  },
  staging: {
    user: 'root',
    password: '',
    database: 'antarctica',
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    logging: true,
    pool: {
      max: 5,
      min: 1,
      idle: 30000,
    },
  },
  production: {
    user: 'root',
    password: '',
    database: 'antarctica',
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    logging: true,
    pool: {
      max: 5,
      min: 1,
      idle: 30000,
    },
  },
};
