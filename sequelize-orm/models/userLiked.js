var sequelize = require("./../db/db");
const Sequelize = require('sequelize');

const UserLiked = sequelize.define('userLiked', {
  userName: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  commentID: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  liked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

UserLiked.sync();

module.exports = UserLiked;
