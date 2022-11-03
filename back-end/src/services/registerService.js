const { Op } = require('sequelize');
const md5 = require('md5');

const { users } = require('../database/models');
const { generateToken } = require('../utils/jwt');

const registered = { status: 409, message: 'Usuário já está registrado!' };
const createUser = async ({ name, email, password }) => {
  const pass = md5(password);
  const findUser = await users.findOne({ where: {
    [Op.or]: [
      { name },
      { email },
    ],
  } });
  if (findUser) throw registered;

  const result = await users.create({ name, email, password: pass, role: 'customer' });
  const token = generateToken(result.dataValues);
  return {
    id: result.id,
    name: result.name,
    email: result.email,
    role: result.role, 
    token,
  };
};

module.exports = { createUser };