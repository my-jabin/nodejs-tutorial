const Sequelize = require('sequelize');
const config = require("./config")

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.localhost,
  port: config.port,
  dialect: config.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// testing connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

module.exports = sequelize;
