const { sales, users, salesProducts, products } = require('../database/models');

// const timeElapsed = Date.now();
// const today = new Date(timeElapsed);
const userNotFound = { status: 404, message: 'Cliente não encontrado!' };
const sellerNotFound = { status: 404, message: 'Funcionário não encontrado!' };
const productNotFound = { status: 404, message: 'Produto não encontrado!' };
const saleNotFound = { status: 404, message: 'Venda não encontrada!' };

const validations = async (objs) => {
  // console.log('backend', objs);
  const findUser = await users.findOne({ where: { id: objs.userId } });
  // console.log(findUser);
  if (!findUser) throw userNotFound;
  const findSeller = await users.findOne({ where: { id: objs.sellerId } });
  // console.log(findSeller);
  if (!findSeller) throw sellerNotFound;
};

const validationPro = async (ob) => {
  const resu = [];
  for (let index = 0; index < ob.products.length; index += 1) {
    resu.push(products.findOne({ where: { id: ob.products[index].id } }));
  }
 const teste = await Promise.all(resu);
 console.log('teste', teste);
 for (let index = 0; index < teste.length; index += 1) {
  if (!teste[index]) throw productNotFound;
}
};

// rota para o vendedor ver as vendas de todos os usuários.
const getSalesProducts = async () => {
  const rows = await sales.findAll();
  return rows; 
};

// vendas do usuario logado
const salesFromCustomer = async (id) => {
  const rows = await sales.findAll({ where: { userId: id } });

  return rows; 
};

// o vendedor consegue ver os detalhes da venda.
const getSalePk = async (id) => {
  const findSale = await sales.findOne({ where: { id } });
  if (!findSale) throw saleNotFound;
  const rows = await sales.findByPk(id, 
    {
      include: [{ model: products, as: 'products' },       
      { model: users, as: 'users' }],  
    });

  return rows; 
};

// o cliente faz o pedido
const cartCheckout = async (obj) => {
  await validations(obj);
  await validationPro(obj);

  const result = await sales.create({ 
    ...obj,
    // saleDate: today.toISOString(),
    status: 'Pendente' });

  obj.products.forEach(async (product) => {
    await salesProducts.create({
      saleId: result.id, 
      productId: product.id, 
      quantity: product.quantity, 
    });
  });
    
  return result;
};

const upStatus = async (id, status) => {
  const sale = await sales.findAll({ where: { id } });
  if (!sale || sale.length === 0) throw saleNotFound;
  await sales.update({ status }, { where: { id } });

  const saleUpdated = await sales.findAll({ where: { id } });
  return saleUpdated;
};

module.exports = { cartCheckout, getSalesProducts, getSalePk, salesFromCustomer, upStatus };