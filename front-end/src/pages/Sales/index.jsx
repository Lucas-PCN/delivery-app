import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import SaleCard from '../../components/SaleCard';

function Sales() {
  const [customerSales, setCustomerSales] = useState([]);
  const history = useHistory();
  const [idUser, setIdUser] = useState();
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    const getUserInfo = () => {
      if (!localStorage.getItem('user')) {
        return history.push('/login');
      }
      const { id, token } = JSON.parse(localStorage.getItem('user'));
      setIdUser(id);
      setUserToken(token);
    };

    const fetchCustomerSales = async (value) => {
      const url = 'http://www.localhost:3001/customer/orders';
      const header = { headers: {
        Authorization: `${userToken}`,
        customer: `${idUser}`,
      } };
      const { data } = await axios.get(url, header);
      const salesByUserId = data.filter((sale) => sale.userId === value);
      setCustomerSales(salesByUserId);
    };
    getUserInfo();
    fetchCustomerSales(idUser); // colocar ID do usuário de forma dinamica
  }, [idUser, history, userToken]);

  return (
    <div className="sales-container">
      <Header />
      <div className="cards-container">
        { customerSales.map(({ id, userId, status, saleDate, totalPrice }, index) => (
          <SaleCard
            key={ id }
            saleId={ id }
            userId={ userId }
            sale={ `${index + 1}` }
            status={ status }
            saleDate={ saleDate }
            totalPrice={ totalPrice }
          />
        )) }
      </div>
    </div>
  );
}

export default Sales;
