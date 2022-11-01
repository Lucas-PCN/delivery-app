// const { sales, users, salesProducts } = require('../database/models');

// const timeElapsed = Date.now();
// const today = new Date(timeElapsed);
// const UserNotFound = { status: 404, message: 'Cliente não encontrado!' };
// const SellerNotFound = { status: 404, message: 'Funcionário não encontrado!' };

// const createSalesProducts = async (saleId, arrayOfProducts, quantity) => {
//   await arrayOfProducts.forEach((product) => {
//     salesProducts.create({
//       productId: product,
//     });
//   });

//   await salesProducts.create({
//     saleId,
//     quantity,
//   });
// };

// async function nossaFuncao () {
//   const itens = [array com elementos]
//   for (const item of itens) {
//     const resultado = await funcaoAssincrona();
//     console.log(resultado);
//   }
// }

// const checkout = async ({
//   userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, arrayInfos }) => {
//   const findUser = await users.findOne({ where: { id: userId } });
//   if (!findUser) throw UserNotFound;
//   const findSeller = await users.findOne({ where: { id: sellerId } });
//   if (!findSeller) throw SellerNotFound;
//   const result = await sales.create({ 
//     userId,
//     sellerId,
//     totalPrice,
//     deliveryAddress,
//     deliveryNumber,
//     saleDate: today.toISOString(),
//     status: 'Pendente' });
//   async function change() {
//     const itens = arrayInfos;
//     for (const item of itens) {
//       const resultado = await Promise.all(salesProducts.create({
//         saleId: result.id,
//         productId: item.productId,
//         quantity: item.quantity,
//       }));
//       console.log(resultado);
//     }
//   }
//   return { result, change };
// };

// module.exports = { checkout };