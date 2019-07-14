const fastify = require('fastify')({ logger: true });
const pointOfView = require('point-of-view');
const static = require('fastify-static');
const handlebars = require('handlebars');
const path = require('path');
const mongoose = require("mongoose");

// Credentials
const dbUser = 'bob';
const dbPassword = 'T4iWAimzJUr5B8k';

const booksController = require('./controllers/books');
const { 
  addBook: addBookSchema,
  editBook: editBookSchema,
  deleteBook: deleteBookSchema,
} = require('./schemas');

// plugins
fastify.register(pointOfView, {
  engine: {
    handlebars,
  },
  options: {
    partials: {
      // partials
      header: './views/partials/header.hbs',
      
      // pages
      main: './views/pages/main.hbs',
      addBook: './views/pages/add-book.hbs',
      editBook: './views/pages/edit-book.hbs',
    },
  }
});

fastify.register(static, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
});

// routes
fastify.get('/', booksController.fetchBooks);
fastify.get('/add-book', booksController.viewAddBook);
fastify.get('/edit-book/:bookId', booksController.viewEditBook);

// API
fastify.post('/api/add-book', addBookSchema, booksController.addBook);
fastify.patch('/api/edit-book', editBookSchema, booksController.editBook);
fastify.delete('/api/delete-book', deleteBookSchema, booksController.deleteBook);


// setup 
const start = async () => {
  try {
    mongoose
      .connect(`mongodb://${dbUser}:${dbPassword}@ds149947.mlab.com:49947/fastify-books`, { useNewUrlParser: true });

    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
