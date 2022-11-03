const { 
  cartCheckout,
  getSalesProducts,
  getSalePk,
  salesFromCustomer,
  updateStatus,
} = require('../services/salesService');

const createCheckout = async (req, res, next) => {
  try {
    const result = await cartCheckout(req.body);
  return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getSales = async (_req, res, next) => {
  try {
    const rows = await getSalesProducts();
    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

const salesCustomer = async (req, res, next) => {
  try {
    const { customer } = req.headers;
    const rows = await salesFromCustomer(customer);
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

const saleStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const update = await updateStatus(id, status);

    return res.status(200).json(update);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCheckout, getSales, getSalesByPk, salesCustomer, saleStatus };