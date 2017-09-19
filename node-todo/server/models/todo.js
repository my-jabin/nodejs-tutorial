var mongoose = require('mongoose')
// build the model, It's like the POJO
// we have mongooseidations to specify how do those fields look like
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});


module.exports = {
  Todo
};
