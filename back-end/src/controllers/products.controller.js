const products = require('../services/productsService');

const getProducts = async (req, res, _next) => {
  const rows = await products.getProducts();
  return res.status(200).json(rows);
};

const createProducts = async (req, res, next) => {
  try {
    const result = await products.createProducts(req.body);
  console.log(result);
  return res.status(201).json({ message: 'Produto adicionado!' });
  } catch (error) {
    next(error); 
  }
};

module.exports = { getProducts, createProducts };