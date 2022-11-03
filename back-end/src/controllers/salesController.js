const { 
  cartCheckout, 
  getSalesProducts, 
  getSalePk, 
  salesFromCustomer, 
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

// const saleDetail = async (req, res, next) => {
//   try {
//     const { sale } = req.headers;
//     console.log(sale);
//     const rows = await saleDetails(sale);
//     return res.status(200).json({ rows });
//   } catch (error) {
//     next(error);
//   }
// };

const getSalesByPk = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await getSalePk(id);
    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCheckout, getSales, getSalesByPk, salesCustomer };