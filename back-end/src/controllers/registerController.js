const registerService = require('../services/registerService');

const register = async (req, res, next) => {
  try {
    const result = await registerService.createUser(req.body);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { register };