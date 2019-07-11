const fastify = require('fastify')({ logger: true });
const pointOfView = require('point-of-view');
const static = require('fastify-static');
const handlebars = require('handlebars');
const path = require('path');

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
fastify.get('/', async (request, reply) => {
  reply.view('/views/index.hbs', { });
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
