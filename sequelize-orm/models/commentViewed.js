var sequelize = require("./../db/db");
const Sequelize = require('sequelize');

const CommentViewed = sequelize.define('commentViewed', {
  ecu: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  errorCode: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  totalViewed: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

CommentViewed.sync();

module.exports = CommentViewed;
