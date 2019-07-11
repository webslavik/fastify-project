const Book = require('../models/books');

async function fetchBooks(request, reply) {
  try {
    const books = await Book.find({});

    reply.view('/views/index.hbs', { books });
  } catch (err) {
    console.log('fucking error:', err);
  }
}

module.exports = {
  fetchBooks,  
};
