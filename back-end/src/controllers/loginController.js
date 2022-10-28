const loginService = require('../services/loginService');

const login = async (req, res) => {
  const result = await loginService.loginUsers(req.body);

  return res.status(200).json(result);
};

module.exports = { login };