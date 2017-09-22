var Enum = require('enum');

var codeEnum = new Enum({
  "COMMENT_NOT_FOUND": "Comment not found.",
  "COMMENT_DELETED": "Comment has been deleted.",
  "COMMENT_CREATED": "Comment has been created.",
  "MISSING_ECU_ERRORCODE_ID": "Please specify ecu and errorcode or comment id.",
  "DELETE_ERROR": "Unable to delete. Error occurs.",
  "COMMENT_FOUND": "Comment found.",
  "SUCCESS": "Success.",
  "ERROR": "Error occurs.",
  "COMMENT_VIEWED_UPDATED": "Total viewed updated."
});

//console.log(codeEnum.get("1").key);

module.exports = codeEnum
