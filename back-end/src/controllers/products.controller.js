const productsS = require('../services/productsService');

const getProducts = async (req, res, _next) => {
  const rows = await productsS.getProducts();
  return res.status(200).json(rows);
};

const createProducts = async (req, res, next) => {
  try {
    const result = await productsS.createProducts(req.body);
  console.log(result);
  return res.status(201).json({ message: 'Produto adicionado!' });
  } catch (error) {
    next(error); 
  }
};

module.exports = { getProducts, createProducts };