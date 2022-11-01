const { products } = require('../database/models');

const missingFields = { status: 400, message: 'Some required fields are missing' };
const getProducts = async () => {
  const rows = await products.findAll();
  return rows;
};

const createProducts = async ({ name, price, urlImage }) => {
  if (!name || !price || !urlImage) throw missingFields;
  const rows = await products.create({ name, price, urlImage });
  return rows;
};

module.exports = { createProducts, getProducts };