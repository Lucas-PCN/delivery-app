const error = require('./middleware.error');
const validateLogin = require('./validateLogin');
const validateRegister = require('./validateRegister');
const autenticaMiddleware = require('./autentica');

module.exports = {
  error,
  validateLogin,
  autenticaMiddleware,
  validateRegister,
};