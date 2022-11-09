const Joi = require('joi');

const checkoutValidation = Joi.object({
  userId: Joi.number().required(),
  sellerId: Joi.number().required(),
  totalPrice: Joi.string().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.number().required(),
  products: Joi.array().required(),
}).messages({
  'any.required': '{{#label}} é obrigatório',
});

const validateCheckout = (req, _res, next) => {
  const { error } = checkoutValidation.validate(req.body, { abortEarly: false });
  if (error) {
    const erro = { status: 400, message: error.message };
    throw erro;
  }
  next();
};

module.exports = validateCheckout;