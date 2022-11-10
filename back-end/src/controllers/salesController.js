const { 
  cartCheckout,
  getSalesProducts,
  getSalePk,
  salesFromCustomer,
  upStatus,
} = require('../services/salesService');

const createCheckout = async (req, res, next) => {
  try {
    const result = await cartCheckout(req.body);
  return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getSales = async (req, res, next) => {
  try {
    const token = req.headers.authorization;   
    const rows = await getSalesProducts(token);
    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

const salesCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await salesFromCustomer(id);
    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

const getSalesByPk = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await getSalePk(id);
    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const update = await upStatus(id, status);

    return res.status(200).json(update);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCheckout, getSales, getSalesByPk, salesCustomer, updateStatus };