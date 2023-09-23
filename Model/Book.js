// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
  price: Number,
},{
    versionKey:false
});

let Book = mongoose.model('Book', bookSchema);

module.exports = {Book}
