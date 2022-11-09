import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Table from '../../components/Table';

export default function OrderDetails() {
  const [order, setOrder] = useState([]);
  const [date, setDate] = useState();
  const [seller, setSeller] = useState();
  const [saleStatus, setSaleStatus] = useState();
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState();
  const [deliveryIsDisabled, setDeliveryIsDisabled] = useState(false);

  const { id } = useParams();
  const history = useHistory();
  const { location: { state } } = history;

  const dataTest = 'customer_order_details__element-order-details-label';

  useEffect(() => {
    const getUserInfo = () => {
      if (!localStorage.getItem('user')) {
        return history.push('/login');
      }
      const { token } = JSON.parse(localStorage.getItem('user'));
      setUserToken(token);
      return token;
    };
    const fetchOrderDetail = async (token, value) => {
      const url = `http://www.localhost:3001/customer/orders/${value}`;
      const header = { headers: { Authorization: `${token}` } };
      const { data } = await axios.get(url, header);
      const { products, saleDate, sellerId, status } = data;
      const handleOrder = () => {
        const newOrder = [];
        if (products) {
          products.forEach((el) => {
            const { salesProducts: { quantity }, price, ...remaingInfo } = el;
            const subTotal = (quantity * price);
            newOrder.push({ quantity, subTotal, price, ...remaingInfo });
          });
        }
        return newOrder;
      };
      setOrder(handleOrder());
      setDate(saleDate);
      setSeller(sellerId);
      setSaleStatus(status);
    };
    const token = getUserInfo();
    fetchOrderDetail(token, id);
    if (order.length > 0) setLoading(false);
  }, [id, history, userToken, order]);

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
    <div>
      <Header />
      {loading && <span>Carregando...</span>}
      <table>
        <thead>
          <tr>
            <th
              data-testid={ `${dataTest}-order-id` }
            >
              {`Pedido: ${state}`}
            </th>
            <th
              data-testid={ `${dataTest}-seller-name` }
            >
              {`${seller}`}
            </th>
            <th
              data-testid={ `${dataTest}-order-date` }
            >
              {handleSaleDate(date)}
            </th>
            <th
              data-testid={ `${dataTest}-delivery-status-${id}` }
            >
              {saleStatus}
            </th>
          </tr>
        </thead>
      </table>
      <button
        data-testid="customer_order_details__button-delivery-check"
        type="button"
        onClick={ handleOnClick }
        disabled={ deliveryIsDisabled }
      >
        MARCAR COMO ENTREGUE
      </button>
      {!loading
      && <Table isButtonNeeded={ false } />}
    </div>
  );
}
