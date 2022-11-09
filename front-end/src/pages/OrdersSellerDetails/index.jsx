import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import SellerHeader from '../../components/SellerHeader';
import Table from '../../components/Table';

export default function SellOrderDetails() {
  const [order, setOrder] = useState([]);
  const [date, setDate] = useState();
  const [saleStatus, setSaleStatus] = useState();
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState();
  const [preparingIsDisabled, setPreparingIsDisabled] = useState(false);
  const [dispatchIsDisabled, setDispatchIsDisabled] = useState(false);

  const { id } = useParams();
  const history = useHistory();
  const { location: { state } } = history;

  const dataTest = 'seller_order_details__element-order-details-label';

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
      const { products, saleDate, status } = data;
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
      setSaleStatus(status);
    };
    const token = getUserInfo();
    fetchOrderDetail(token, id);
    if (order.length > 0) setLoading(false);
  }, [id, history, userToken, order]);

  useEffect(() => {
    const verifySaleStatus = (value) => {
      const preparing = value !== 'Pendente';
      const dispatch = value !== 'Preparando';
      setPreparingIsDisabled(preparing);
      setDispatchIsDisabled(dispatch);
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

  const handleOnClick = async (statusToUpdate) => {
    const url = `http://localhost:3001/customer/orders/${id}`;
    const body = { status: `${statusToUpdate}` };
    const { data } = await axios.patch(url, body);
    const [{ status }] = data;
    setSaleStatus(status);
  };

  return (
    <div>
      <SellerHeader />
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
              data-testid={ `${dataTest}-order-date` }
            >
              {handleSaleDate(date)}
            </th>
            <th
              data-testid={ `${dataTest}-delivery-status` }
            >
              {saleStatus}
            </th>
          </tr>
        </thead>
      </table>
      <button
        data-testid="seller_order_details__button-preparing-check"
        type="button"
        onClick={ () => handleOnClick('Preparando') }
        disabled={ preparingIsDisabled }
      >
        PREPARAR PEDIDO

      </button>
      <button
        data-testid="seller_order_details__button-dispatch-check"
        type="button"
        onClick={ () => handleOnClick('Em Trânsito') }
        disabled={ dispatchIsDisabled }
      >
        SAIU PARA ENTREGA

      </button>
      {!loading
      && <Table
        isButtonNeeded={ false }
        dataTest="seller_order_details"
      />}
    </div>
  );
}
