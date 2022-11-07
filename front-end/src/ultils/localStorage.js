const getCars = () => {
  const cartProducts = JSON.parse(localStorage.getItem('cart'));
  return cartProducts;
};

export const updateCarsRemove = (cars = []) => {
  localStorage.setItem('cart', JSON.stringify(cars));
};

export const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};

export default getCars;
