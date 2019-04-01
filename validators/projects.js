const { checkSchema } = require('express-validator/check');

const createProjectValidator = checkSchema({
  name: {
    isLength: {
      errorMessage: 'Name should be at least 1 char long',
      options: { min: 1 }
    }
  }
});

const createTaskValidator = checkSchema({
  name: {
    isLength: {
      errorMessage: 'Name should be at least 1 char long',
      options: { min: 1 }
    }
  }
});

const updateTaskValidator = checkSchema({
  name: {
  	optional: true,
    isLength: {
      errorMessage: 'Name should be at least 1 char long',
      options: { min: 1 }
    }
  }
});

module.exports = createProjectValidator, createTaskValidator, updateTaskValidator;
