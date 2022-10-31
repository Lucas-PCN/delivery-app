const Joi = require('joi');

const registerValidation = Joi.object({
  name: Joi.string().required().min(12),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
}).messages({
  'any.required': '{{#label}} is required',
});

const validateRegister = (req, _res, next) => {
  const { error } = registerValidation.validate(req.body, { abortEarly: false });
  if (error) {
    const erro = { status: 400, message: error.message };
    throw erro;
  }
  next();
};

module.exports = validateRegister;