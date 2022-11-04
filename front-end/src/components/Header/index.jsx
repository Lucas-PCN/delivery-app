import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';

function Header() {
  const history = useHistory();
  const [user, setUser] = useState('');

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  useEffect(() => {
    const userLogado = JSON.parse(localStorage.getItem('user'));

    if (!userLogado) {
      return history.push('/login');
    }

    setUser(userLogado);
  }, [history]);

  return (
    <div className="header-container">
      <div className="header-content">
        <div className="btn-left">
          <Link
            className="btn-to-products"
            data-testid="customer_products__element-navbar-link-products"
            to="/customer/products"
          >
            Produtos
          </Link>
          <Link
            className="btn-to-checkout"
            data-testid="customer_products__element-navbar-link-orders"
            to="/customer/checkout"
            type="button"
          >
            Meus pedidos
          </Link>
        </div>
        <div className="btn-rigth">
          <h3
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { user.name }
          </h3>
          <button
            onClick={ () => logout() }
            type="button"
          >
            <Link
              className="btn-to-logout"
              to="/login"
              data-testid="customer_products__element-navbar-link-logout"
            >
              Sair
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
