const md5 = require('md5');
const { users } = require('../database/models');
const { generateToken } = require('../utils/jwt');

const missingFields = { status: 404, message: 'Todos os campos obrigatórios!' };
const loginIncorreto = { status: 404, message: 'E-mail ou senha incorreta!' };

const loginUser = async ({ email, password }) => {
  if (!email || !password) throw missingFields;

  const pass = md5(password);
  
  const userLogin = await users.findOne(
    { attributes: ['id', 'name', 'email', 'role'], where: { email, password: pass } },
);

if (!userLogin) throw loginIncorreto;

  const token = generateToken(userLogin.dataValues);
  return {
    id: userLogin.id,
    name: userLogin.name,
    email: userLogin.email,
    role: userLogin.role, 
    token,
  };
};

module.exports = { loginUser };