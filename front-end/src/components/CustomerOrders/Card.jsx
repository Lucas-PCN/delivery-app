import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

export default function Card({
  saleId,
  order,
  status,
  saleDate,
  totalPrice }) {
  const history = useHistory();

  const handleSaleDate = (date) => {
    const newDate = date.split('-');
    const day = newDate[2].split('T');
    const mounth = newDate[1];
    const year = newDate[0];

    return `${day[0]}/${mounth}/${year}`;
  };

  const onClick = (value) => {
    history.push({
      pathname: `/customer/orders/${value}`,
      state: value,
    });
  };

  const changeTotalPrice = (value) => {
    const result = value.replace(/\./, ',');
    return result;
  };

  return (
    <div
      className="card-customer"
      onClick={ () => onClick(saleId) }
      aria-hidden="true"
      data-testid={ `customer_orders__element-order-id-${saleId}` }
    >

      <div className="card-header">
        <span data-testid={ `customer_orders__element-order-id-${order}` }>
          {`Pedido: ${order}`}
        </span>

        <span data-testid={ `customer_orders__element-delivery-status-${order}` }>
          {status}
        </span>
      </div>

      <div className="card-footer">
        <span data-testid={ `customer_orders__element-order-date-${order}` }>
          {handleSaleDate(saleDate)}
        </span>

        <span data-testid={ `customer_orders__element-card-price-${order}` }>
          {changeTotalPrice(totalPrice)}
        </span>
      </div>
    </div>
  );
}

Card.propTypes = {
  saleId: PropTypes.number,
  status: PropTypes.string,
  saleDate: PropTypes.string,
  totalPrice: PropTypes.string,
}.isRequired;
