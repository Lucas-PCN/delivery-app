import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../providers/Auth';
import Header from '../../components/Header';

import IconMinus from '../../images/icons/minus-circle.svg';
import IconPlus from '../../images/icons/plus-circle.svg';

import './styles.css';

function Products() {
  const INCREMENT_QUANTITY = 1;
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const instance = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 1000,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(cart);
  useEffect(() => {
    async function getProducts() {
      const response = await instance.get('/products').then((res) => res.data);

      const productList = response.map((res) => {
        const newProduct = {
          ...res,
          quantity: 0,
        };
        return newProduct;
      });

      setProducts(productList);
    }
    getProducts();
  }, []);

  function incrementQuantity(id) {
    const increment = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + INCREMENT_QUANTITY,
        };
      }
      return product;
    });

    return setProducts(increment);
  }

  useEffect(() => {
    const cartList = products.filter((product) => product.quantity >= 1);
    const total = cartList.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    setTotalPrice(total);
    setCart(cartList);
  }, [products]);

  function decrementQuantity(id) {
    const decrement = products.map((product) => {
      if (product.id === id) {
        if (product.quantity > 0) {
          return {
            ...product,
            quantity: product.quantity - INCREMENT_QUANTITY,
          };
        }
        return product;
      }
      return product;
    });

    return setProducts(decrement);
  }

  return (
    <div className="products-container">
      <Header />
      <div className="cart-price">
        <button
          datatestid="customer_products__checkout-bottom-value"
          type="button"
        >
          Ver carrinho: R$
          {' '}
          {totalPrice.toFixed(2)}
        </button>
      </div>
      <div className="product-content">
        <ul className="list-products">
          { products.map((product) => (
            <li className="product-item" key={ product.id }>
              <img
                className="image-product"
                datatestid="customer_products__img-card-bg-image"
                src={ product.urlImage }
                alt="Product"
              />
              <div className="product-name">
                <strong
                  datatestid="customer_products__element-card-title"
                >
                  {product.name}
                </strong>
              </div>
              <div className="card-description">
                <span
                  datatestid="customer_products__element-card-price"
                >
                  { product.price }
                </span>
                <div className="btn-quantity">
                  <button
                    type="button"
                    datatestid="customer_products__button-card-rm-item"
                    onClick={ () => decrementQuantity(product.id) }
                  >
                    <img src={ IconMinus } alt="Icon minus" />
                  </button>
                  <input
                    datatestid="customer_products__input-card-quantity"
                    type="text"
                    value={ product.quantity }
                  />
                  <button
                    type="button"
                    datatestid="customer_products__button-card-add-item"
                    onClick={
                      () => incrementQuantity(product.id)
                    }
                  >
                    <img src={ IconPlus } alt="Icon plus" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Products;
