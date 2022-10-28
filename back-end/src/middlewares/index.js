const error = require('./middleware.error');
const validateLogin = require('./validateLogin');
const autenticaMiddleware = require('./autentica');

module.exports = {
  error,
  validateLogin,
  autenticaMiddleware,
};