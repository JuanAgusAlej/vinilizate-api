const Sequelize = require('sequelize')
const db = new Sequelize('Vinilizate', 'postgres', '47981293', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});


module.exports = db