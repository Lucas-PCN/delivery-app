import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SellerHeader from '../../components/SellerHeader';
import Table from '../../components/Table';
import { AuthContext } from '../../providers/Auth';

export default function SellOrderDetails() {
  const { setPedido } = useContext(AuthContext);
  const [seller, setSeller] = useState([]);
  const [saleStatus, setSaleStatus] = useState('');
  const [preparingIsDisabled, setPreparingIsDisabled] = useState(false);
  const [dispatchIsDisabled, setDispatchIsDisabled] = useState(false);

  const dataTest = 'seller_order_details__element-order-details-label';

  const { id } = useParams();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    const instance = axios.create({
      baseURL: 'http://localhost:3001/',
      headers: { authorization: user.token },
    });

    const getPedidos = async () => {
      await instance.get(`customer/orders/${id}`)
        .then((res) => {
          setSeller(res.data);
          setSaleStatus(res.data.status);
          setPedido(res.data.products);
        }).catch((err) => err);
    };
    getPedidos();
  }, [id, setPedido]);

  const handleSaleDate = (value) => {
    if (value) {
      const newDate = value.split('-');
      const day = newDate[2].split('T');
      const mounth = newDate[1];
      const year = newDate[0];
      return `${day[0]}/${mounth}/${year}`;
    }
  };

  useEffect(() => {
    const verifySaleStatus = (value) => {
      const preparing = value !== 'Pendente';
      const dispatch = value !== 'Preparando';
      setPreparingIsDisabled(preparing);
      setDispatchIsDisabled(dispatch);
    };
    verifySaleStatus(saleStatus);
  }, [saleStatus]);

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
      <table>
        <thead>
          <tr>
            <th
              data-testid={ `${dataTest}-order-id` }
            >
              {`Pedido: ${seller.id}`}
            </th>
            <th
              data-testid={ `${dataTest}-order-date` }
            >
              {handleSaleDate(seller.saleDate)}
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
      <Table
        isPage="seller"
        dataTest="seller_order_details"
      />
    </div>
  );
}
