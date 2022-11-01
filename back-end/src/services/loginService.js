const md5 = require('md5');
const { users } = require('../database/models');
const { generateToken } = require('../utils/jwt');

const missingFields = { status: 404, message: 'Some required fields are missing' };
const loginIncorreto = { status: 404, message: 'Email ou senha incorreta' };

const loginUsers = async ({ email, password }) => {
  if (!email || !password) throw missingFields;
  const pass = md5(password);
  const userLogin = await users.findOne(
    { attributes: ['name', 'email', 'role'], where: { email, password: pass } },
);

if (!userLogin) throw loginIncorreto;

  const token = generateToken(userLogin.dataValues);
  return {
    name: userLogin.name,
    email: userLogin.email,
    role: userLogin.role, 
    token,
  };
};

module.exports = { loginUsers };