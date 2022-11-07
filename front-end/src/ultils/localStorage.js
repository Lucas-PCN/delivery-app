const getCars = () => {
  const cartProducts = JSON.parse(localStorage.getItem('cart'));
  console.log('getcars', cartProducts);
  return cartProducts;
};

export const updateCarsRemove = (cars = []) => {
  localStorage.setItem('cart', JSON.stringify(cars));
  console.log('atualiza localStorage', cars);
};

export const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('user', user );
  return user;
};

export default getCars;
