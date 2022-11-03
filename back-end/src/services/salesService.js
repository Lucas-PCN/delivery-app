const { sales, users, salesProducts, products } = require('../database/models');

const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const UserNotFound = { status: 404, message: 'Cliente não encontrado!' };
const SellerNotFound = { status: 404, message: 'Funcionário não encontrado!' };
const productNotFound = { status: 404, message: 'Produto não encontrado!' };

const validations = async (objs) => {
  const findUser = await users.findOne({ where: { id: objs.userId } });
  if (!findUser) throw UserNotFound;
  const findSeller = await users.findOne({ where: { id: objs.sellerId } });
  if (!findSeller) throw SellerNotFound;
};

const validationPro = async (ob) => {
  const resu = [];
  for (let index = 0; index < ob.products.length; index += 1) {
    resu.push(products.findOne({ where: { id: ob.products[index].productId } }));
  }
 const teste = await Promise.all(resu);
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
  const rows = await sales.findByPk(id, 
    {
      include: [{ model: products, as: 'products' },       
      { model: users, as: 'users' }],  
    });
  return rows; 
};

// const saleDetails = async (id) => {
//   const order = await sales.findByPk(id, 
//     {
//       include: [{ model: products, as: 'products' },       
//       { model: users, as: 'users' }],  
//     });
//   return order; 
// };

// o cliente faz o pedido
const cartCheckout = async (obj) => {
  await validations(obj);
  await validationPro(obj);

  const result = await sales.create({ 
    ...obj,
    saleDate: today.toISOString(),
    status: 'Pendente' });
   obj.products.forEach(async (product) => {
      await salesProducts.create(
        { saleId: result.id, 
          productId: product.productId, 
          quantity: product.quantity },
          );
    });
    
  return result;
};

module.exports = { cartCheckout, getSalesProducts, getSalePk, salesFromCustomer };