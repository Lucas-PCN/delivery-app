const loginService = require('../services/loginService');

const login = async (req, res, next) => {
  try {
    const result = await loginService.loginUsers(req.body);

  return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { login };