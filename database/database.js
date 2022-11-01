const Sequelize = require('sequelize');
const {
  options, database, user, password,
} = require('./config.json');

module.exports = new Sequelize(database, user, password, options);
