const Joi = require('joi');

exports.employeeRequest = Joi.object({
  fullName: Joi.string().required(),
  jobTitle: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  contacts: Joi.array().items(Joi.object({
    contactName: Joi.string().required(),
    relationship: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    contactType: Joi.string().required(),
  })),
});