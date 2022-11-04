const registerService = require('../services/registerService');

const register = async (req, res, next) => {
  try {
    const result = await registerService.createUser(req.body);
     return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const result = await registerService.createUserByAdmin(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const result = await registerService.getAllUsers();
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await registerService.deleteUsers(id);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;
    const result = await registerService.updateUsers(id, name, role);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, createUser, getAll, deleteUsers, updateUsers };