const addBook = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        cover: { type: 'string' },
        description: { type: 'string' },
      },
      required: ['name', 'cover', 'description'],
    },
    response: {
      201: {
        type: 'object',
        properties: {
          success: { type: 'boolean'},
          message: { type: 'string' },
        }
      }
    }
  }
};

module.exports = {
  addBook,
};
