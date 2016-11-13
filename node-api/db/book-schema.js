const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const bookSchema = new Schema({
  Title: { type: String },
  Author: { type: String },
  isbn: { type: String }
});


module.exports = mongoose.model('books', bookSchema);
