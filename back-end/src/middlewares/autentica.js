const { verificaToken } = require('../utils/jwt');

const autenticaMiddleware = (req, res, next) => {
const token = req.headers.authorization;
  const user = verificaToken(token);
  if (!user) {
    const erro = { status: 401, message: 'Token não encontrado!' };
    throw erro;
  }
  res.locals.user = user;
  next();
};

module.exports = autenticaMiddleware;