const fastify = require('fastify')({ logger: true });
const pointOfView = require('point-of-view');
const static = require('fastify-static');
const handlebars = require('handlebars');
const path = require('path');
const mongoose = require("mongoose");

const dbUser = 'bob';
const dbPassword = 'T4iWAimzJUr5B8k';

const booksController = require('./controllers/books');

// plugins
fastify.register(pointOfView, {
  engine: {
    handlebars,
  },
  options: {
    partials: {
      header: './views/partials/header.hbs',
      books: './views/partials/books.hbs',
    }
  }
});

fastify.register(static, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
});

// routes
fastify.get('/', booksController.fetchBooks);

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
