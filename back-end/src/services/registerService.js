const { Op } = require('sequelize');
const { users } = require('../database/models');

const createUser = async ({ name, email, password }) => {
  const findUser = await users.findOne({ where: {
    [Op.or]: [
      { name },
      { email },
    ],
  } });
  if (findUser) {
    const erro = { status: 409, message: 'user aleready registered' };
    throw erro;
  }

  const result = await users.create({ name, email, password, role: 'customer' });

  return result;
};

module.exports = { createUser };