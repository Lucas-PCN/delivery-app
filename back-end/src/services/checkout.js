const { sales, users } = require('../database/models');

const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const UserNotFound = { status: 404, message: 'Cliente não encontrado!' };
const SellerNotFound = { status: 404, message: 'Funcionário não encontrado!' };

const checkout = async ({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber }) => {
  const findUser = await users.findOne({ where: { id: userId } });
  if (!findUser) throw UserNotFound;
  const findSeller = await users.findOne({ where: { id: sellerId } });
  if (!findSeller) throw SellerNotFound;
const result = await sales.create({ 
  userId, 
  sellerId, 
  totalPrice, 
  deliveryAddress, 
  deliveryNumber, 
  saleDate: today.toISOString(), 
  status: 'Pendente' });
return result;
};

// const saleProduct = async () => {

// };

module.exports = { checkout };