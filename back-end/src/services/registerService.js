const { Op } = require('sequelize');
const md5 = require('md5');

const { users } = require('../database/models');
const { generateToken, verificaToken } = require('../utils/jwt');

const registered = { status: 409, message: 'Usuário já está registrado!' };
const userNotFound = { status: 404, message: 'Cliente não encontrado!' };
const notAdmin = { status: 404, message: 'Usuário não é administrador!' };

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

const createUserByAdmin = async ({ name, email, password, role }, token) => {
  const pass = md5(password);
  const isAdmin = verificaToken(token);
  if (isAdmin.data.role !== 'administrator') throw notAdmin;
  const findUser = await users.findOne({ where: {
    [Op.or]: [
      { name },
      { email },
    ],
  } });
  if (findUser) throw registered;

  const result = await users.create({ name, email, password: pass, role });

  return {
    id: result.id,
    name: result.name,
    email: result.email,
    role: result.role, 
  };
};

const getAllUsers = async () => {
  const getAll = await users.findAll({ attributes: { exclude: 'password' } });
  
  return getAll;
};

const deleteUser = async (id) => {
  const result = await users.destroy({ where: { id } });

  return result;
};

const updateUser = async (id, name, role) => {
  const findUser = await users.findOne({ where: { id } });
  if (!findUser) throw userNotFound;

  const findName = await users.findOne({ where: { name } });
  if (findName) throw registered;

  await users.update({ name, role }, { where: { id } });

  const userUpdated = await users.findOne({ where: { id } });
  return userUpdated;
};

module.exports = { 
  createUser, 
  createUserByAdmin, 
  getAllUsers, 
  deleteUser, 
  updateUser };