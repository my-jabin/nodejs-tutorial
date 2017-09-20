var sequelize = require("./../db/db");
const Sequelize = require('sequelize');

const Comment = sequelize.define('comment', {
  commentID: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  },
  ecu: {
    type: Sequelize.STRING,
    allowNull: false
  },
  errorCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // ecuErrorCodeId: {
  //   type: Sequelize.STRING,
  //   field: 'ect_errorcode_id',
  //   get() {
  //     const ecu = this.getDataValue('ecu');
  //     const errorCode = this.getDataValue('errorCode');
  //     return ecu + "-" + errorCode;
  //   },
  //   set(val) {
  //     const ecu = this.getDataValue('ecu');
  //     const errorCode = this.getDataValue('errorCode');
  //     console.log("TESTING" + ect + "-" + errorCode);
  //     this.setDataValue('ect_errorcode_id', ecu + "-" + errorCode)
  //   }
  // },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  like: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
Comment.sync();

module.exports = Comment;
