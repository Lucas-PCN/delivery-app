import React from 'react';
import { Link } from 'react-router-dom';

function SellerHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear();
  };

  return (
    <div className="header-container">
      <div className="header-content">
        <div className="btn-left">
          <Link
            className="btn-to-checkout"
            to="/seller/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            PEDIDOS
          </Link>
        </div>
        <div className="btn-rigth">
          <h3
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { user.name }
          </h3>
          <Link
            className="btn-to-logout"
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
          >
            <button onClick={ () => logout() } type="button">
              Sair
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SellerHeader;
