// router/routers.js
const express = require('express');
const router = express.Router();
const {Book} = require('../Model/Book'); // Imported Book model

// Add a new book
router.post('/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: 'Error adding book' });
  }
});

// Retrieve all books
router.get('/books', async (req, res) => {
   
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(200).json({ error: 'Error retrieving books' });
  }
});

// Delete a book by ID
router.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(deletedBook);
  } catch (err) {
    res.status(200).json({ error: 'Error deleting book' });
  }
});


//filter by genre || id etc.
router.get('/books/filter', async (req, res) => {
    const { genre } = req.query;
  
    try {
      const filteredBooks = await Book.find({ genre });
      res.json(filteredBooks);
    } catch (err) {
      res.status(200).json({ error: 'Error filtering books' });
    }
  });

  // Sort books by price
router.get('/books/sort', async (req, res) => {
    const { order } = req.query;
    const sortOrder = order === 'asc' ? 'asc' : 'desc';
  
    try {
      const sortedBooks = await Book.find().sort({ price: sortOrder });
      res.json(sortedBooks);
    } catch (err) {
      res.status(200).json({ error: 'Error sorting books' });
    }
  });




module.exports = {router};
