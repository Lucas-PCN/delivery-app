import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';

import IconMinus from '../../images/icons/minus-circle.svg';
import IconPlus from '../../images/icons/plus-circle.svg';
import { AuthContext } from '../../providers/Auth';

import './styles.css';

function Products() {
  const INCREMENT_QUANTITY = 1;
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(AuthContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'));

    const instance = axios.create({
      baseURL: 'http://localhost:3001/',
      headers: { authorization: token.token },
    });

    const getProducts = async () => {
      const response = await instance.get('/products').then((res) => res.data);

      const productList = response.map((res) => {
        const newProduct = {
          ...res,
          quantity: 0,
        };
        return newProduct;
      });

      setProducts(productList);
    };
    getProducts();
  }, [history]);

  const incrementQuantity = (id) => {
    const increment = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    return setProducts(increment);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const cartList = products.filter((product) => product.quantity >= 1);
    const total = cartList.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    setTotalPrice(total);
    setCart(cartList);
  }, [products, setCart]);

  useEffect(() => {
    if (totalPrice > 0) return setButtonDisable(false);
    return setButtonDisable(true);
  }, [totalPrice]);

  const decrementQuantity = (id) => {
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
  };

  const setQuantityProduct = (e, id) => {
    const { value } = e.target;

    const decrement = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: Number(value),
        };
      }
      return product;
    });

    return setProducts(decrement);
  };

  const redirectToCart = () => history.push('/customer/checkout');

  return (
    <div className="products-container">
      <Header />
      <div className="cart-price">
        <button
          data-testid="customer_products__button-cart"
          type="button"
          disabled={ buttonDisable }
          onClick={ () => redirectToCart() }
        >
          <div
            data-testid="customer_products__checkout-bottom-value"
          >
            {totalPrice.toFixed(2).replace('.', ',')}
          </div>
        </button>
      </div>
      <div className="product-content">
        <ul className="list-products">
          { products.map((product) => (
            <li className="product-item" key={ product.id }>
              <img
                className="image-product"
                data-testid={ `customer_products__img-card-bg-image-${product.id}` }
                src={ product.urlImage }
                alt="Product"
              />
              <div className="product-name">
                <strong
                  data-testid={ `customer_products__element-card-title-${product.id}` }
                >
                  {product.name}
                </strong>
              </div>
              <div className="card-description">
                <span
                  data-testid={ `customer_products__element-card-price-${product.id}` }
                >
                  { product.price.toString().replace('.', ',') }
                </span>
                <div className="btn-quantity">
                  <button
                    type="button"
                    data-testid={ `customer_products__button-card-rm-item-${product.id}` }
                    onClick={ () => decrementQuantity(product.id) }
                  >
                    <img src={ IconMinus } alt="Icon minus" />
                  </button>
                  <input
                    data-testid={ `customer_products__input-card-quantity-${product.id}` }
                    type="text"
                    onChange={ (e) => setQuantityProduct(e, product.id) }
                    value={ product.quantity }
                  />
                  <button
                    type="button"
                    data-testid={
                      `customer_products__button-card-add-item-${product.id}`
                    }
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
