const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dbUser = 'bob';
const dbPassword = 'T4iWAimzJUr5B8k';

const bookScheme = new Schema({
  name: String,
  text: String,
  cover: String,
});

module.exports = mongoose.model("Book", bookScheme);
