const { products } = require('../database/models');

const getProducts = async () => {
  const rows = await products.findAll();
  return rows;
};

const missingFields = { status: 400, message: 'Todos os campos são obrigatórios!' };
const createProducts = async ({ name, price, urlImage }) => {
  if (!name || !price || !urlImage) throw missingFields;
  const rows = await products.create({ name, price, urlImage });
  return rows;
};
const notFound = { status: 404, message: 'Produto não encontrado!' };
const validationProduct = (product) => {
  if (!product || null) throw notFound;
};
const updateProducts = async (id, { name, price, urlImage }) => {
  if (!name || !price || !urlImage) throw missingFields;
  const findProduct = await products.findByPk(Number(id));
  validationProduct(findProduct);  
  const rows = await products.update({ name, price, urlImage }, { where: { id } });
  return rows;
};

module.exports = { createProducts, getProducts, updateProducts };