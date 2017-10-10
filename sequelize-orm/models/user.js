var sequelize = require("./../db/db");
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
  userID: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.sync();

module.exports = User;
