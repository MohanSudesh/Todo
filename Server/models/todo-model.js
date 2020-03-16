const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var todoschema = new Schema({
  name: {
    type: String
  },
  priority: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

module.exports = mongoose.model("todomodel", todoschema);
