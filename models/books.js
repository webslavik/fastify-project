const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Book", bookScheme);
