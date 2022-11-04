const error = require('./middleware.error');
const validateLogin = require('./validateLogin');
const validateRegister = require('./validateRegister');
const autenticaToken = require('./autentica');

module.exports = {
  error,
  validateLogin,
  autenticaToken,
  validateRegister,
};