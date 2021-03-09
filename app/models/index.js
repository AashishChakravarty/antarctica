const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/db')[env];

const db = {};
let connection;
// HANDLING
global.connection;

connection = new Sequelize(config.database, config.user, config.password, {
  ...config,
});

// Checking connection status
connection
  .authenticate()
  .then((err) => {
    if (err) {
      console.log(
        '\n######################################### ERROR IN DATABASE CONNECTION #########################################\n'
      );
      console.log('\n ERROR \n', err);
    } else {
      global.connection;
      console.log(
        '\n######################################### DATABASE CONNECTED #########################################\n'
      );
    }
  })
  .catch((error) => {
    console.log('error', error);
  });

db.connection = connection;
db.Sequelize = Sequelize;

db.users = require('./users')(connection, Sequelize);
db.employees = require('./employees')(connection, Sequelize);

module.exports = db;
