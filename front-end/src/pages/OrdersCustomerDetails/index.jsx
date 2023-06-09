import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Table from '../../components/Table';
import { AuthContext } from '../../providers/Auth';

import './style.css';

export default function OrderDetails() {
  const { setOrderCustomer } = useContext(AuthContext);
  const [seller, setSeller] = useState([]);
  const [saleStatus, setSaleStatus] = useState('');
  const [deliveryIsDisabled, setDeliveryIsDisabled] = useState(false);
  const [sellerName, setSellerName] = useState('');

  const { id } = useParams();

  const dataTest = 'customer_order_details__element-order-details-label';

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    const instance = axios.create({
      baseURL: 'http://localhost:3001/',
      headers: { authorization: user.token },
    });

    const getPedidos = async () => {
      await instance.get(`customer/orders/${id}`).then((res) => {
        setSeller(res.data);
        setSaleStatus(res.data.status);
        setOrderCustomer(res.data.products);
      }).catch((err) => console.log(err));
    };

    getPedidos();
  }, [id, setOrderCustomer]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    const instance = axios.create({
      baseURL: 'http://localhost:3001/',
      headers: { authorization: user.token },
    });

    const getSellerName = async () => {
      console.log(seller);
      await instance.get('/admin/manage').then(
        (res) => {
          const resData = res.data;
          const responseSellerName = resData.find((obj) => obj.id === seller.sellerId);
          return setSellerName(responseSellerName.name);
        },
      ).catch((err) => err);
    };

    getSellerName();
  }, [seller]);

  useEffect(() => {
    const verifySaleStatus = (value) => {
      const delivery = value !== 'Em Trânsito';
      setDeliveryIsDisabled(delivery);
    };
    verifySaleStatus(saleStatus);
  }, [saleStatus]);

  const handleSaleDate = (value) => {
    if (value) {
      const newDate = value.split('-');
      const day = newDate[2].split('T');
      const mounth = newDate[1];
      const year = newDate[0];

      return `${day[0]}/${mounth}/${year}`;
    }
  };

  const handleOnClick = async () => {
    const url = `http://localhost:3001/customer/orders/${id}`;
    const body = { status: 'Entregue' };
    const { data } = await axios.patch(url, body);
    const [{ status }] = data;
    setSaleStatus(status);
  };

  return (
    <div className="order-customer-container">
      <Header />
      <div className="order-customer-content">
        <div className="order-customer-info">
          <div className="info-header">
            <span data-testid={ `${dataTest}-order-id` }>
              {`Pedido: ${seller.id}`}
            </span>
            <span data-testid={ `${dataTest}-delivery-status-${id}` }>
              {saleStatus}
            </span>

          </div>

          <div className="info-footer">
            <span data-testid={ `${dataTest}-seller-name` }>
              {`${sellerName}`}
            </span>
            <span data-testid={ `${dataTest}-order-date` }>
              {handleSaleDate(seller.saleDate)}
            </span>

            <button
              data-testid="customer_order_details__button-delivery-check"
              type="button"
              onClick={ handleOnClick }
              disabled={ deliveryIsDisabled }
              className={
                (deliveryIsDisabled) ? 'btn-delivered-disable' : 'btn-delivered'
              }
            >
              MARCAR COMO ENTREGUE
            </button>
          </div>

        </div>
        <Table isPage="customer" dataTest="customer_order_details" />
      </div>
    </div>
  );
}
