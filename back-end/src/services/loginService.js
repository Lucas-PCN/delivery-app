const { users } = require('../database/models');

const loginUsers = async ({ email, password }) => {
  const userLogin = await users.findOne({ where: { email, password } });

  return userLogin;
};

module.exports = { loginUsers };