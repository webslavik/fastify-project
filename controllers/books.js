const Book = require('../models/books');

async function fetchBooks(request, reply) {
  try {
    const books = await Book.find({});

    reply.view('/views/index.hbs', { books });
  } catch (err) {
    console.log('fucking error:', err);
  }
}

async function viewAddBook(request, reply) {
  try {
    reply.view('/views/add-book.hbs', { });
  } catch (err) {
    console.log('fucking error:', err);
  }
}

async function addBook(request, reply) {
  try {
    const { name, cover, description } = request.body;

    await Book.create({
      name,
      cover,
      description,
    });

    reply.code(201).send({ success: true, message: 'Book was added' });
  } catch (err) {
    reply.code(500).send({ 
      success: false, 
      message: err.message,
    });
  }
}

async function deleteBook(request, reply) {
  try {
    const { bookId } = request.body;
    await Book.remove({ _id: bookId });
    
    reply.code(200).send({
      success: true,
      message: 'Book was deleted',
    });
  } catch (err) {
    reply.code(500).send({ 
      success: false, 
      message: err.message,
    });
  }
}

module.exports = {
  viewAddBook,

  fetchBooks,  
  addBook,
  deleteBook,
};
