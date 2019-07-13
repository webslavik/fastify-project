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
const { addBook: addBookSchema } = require('./schemas');

// plugins
fastify.register(pointOfView, {
  engine: {
    handlebars,
  },
  options: {
    partials: {
      // partials
      header: './views/partials/header.hbs',
      books: './views/partials/books.hbs',

      // pages
      addBook: './views/pages/add-book.hbs',
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

// API
fastify.post('/api/add-book', addBookSchema, booksController.addBook);


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
