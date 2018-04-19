var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  userId:{
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: false
  },
  doneDate: {
    type: Date
  },
  reminder:{
    type: Date
  }
});

module.exports = mongoose.model('task', taskSchema);
