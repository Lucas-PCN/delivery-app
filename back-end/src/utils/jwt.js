const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf8' });
const config = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const generateToken = (data) => 
jwt.sign({ data }, SECRET, config);

const verificaToken = (token) => {
  if (!token) {
    const erro = { status: 401, message: 'Token não encontrado!' };
    throw erro;
  }

  const validate = jwt.verify(token, SECRET);
  return validate;
};

module.exports = {
  generateToken,
  verificaToken,
};
