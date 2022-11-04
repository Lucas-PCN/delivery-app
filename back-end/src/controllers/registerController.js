const registerService = require('../services/registerService');

const register = async (req, res, next) => {
  try {
    const result = await registerService.createUser(req.body);
     return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const token = req.headers.authorization;   
    const result = await registerService.createUserByAdmin(req.body, token);
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

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await registerService.deleteUser(id);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;
    const result = await registerService.updateUser(id, name, role);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, create, getAll, remove, update };