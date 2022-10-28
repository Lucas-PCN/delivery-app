const Joi = require('joi');

const loginValidation = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
}).messages({
  'any.required': '{{#label}} is required',
});

const validate = (req, _res, next) => {
  const { error } = loginValidation.validate(req.body, { abortEarly: false });
  if (error) {
    const erro = { status: 400, message: error.message };
    throw erro;
  }
  next();
};

module.exports = validate;