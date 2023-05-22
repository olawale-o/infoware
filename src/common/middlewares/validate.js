const Joi = require('joi');
const AppError = require('../app-error');

const validateRequestSchema = (schema) => (req, res, next) => {
  const { value, error } = Joi.compile(schema).validate(req.body,  { abortEarly: false });
  if (error) {
    const errors = error.details
      .map((details) => ({
        [details.context.key]: details.message.replace(/"/g, ''),
      }))  
    throw new AppError(
      422,
      errors,
    );
  }
  Object.assign(req, value);
  return next();
};

module.exports = validateRequestSchema;