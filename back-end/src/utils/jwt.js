const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'trybe';
const config = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const generateToken = (data) => 
jwt.sign({ data }, SECRET, config);

const verificaToken = (token) => {
  if (!token) {
    const erro = { status: 401, message: 'Token not found' };
    throw erro;
  }

  const validate = jwt.verify(token, SECRET);
  return validate;
};

module.exports = {
  generateToken,
  verificaToken,
};
