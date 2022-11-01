const { checkout } = require('../services/checkout');

const createCheckout = async (req, res, next) => {
  try {
    const result = await checkout(req.body);
  return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCheckout };