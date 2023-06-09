import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Card from '../../components/CustomerOrders/Card';

import './style.css';

function CustomerOrders() {
  const [customerSales, setCustomerSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idUser, setIdUser] = useState();
  const [userToken, setUserToken] = useState();
  const history = useHistory();

  useEffect(() => {
    const getUserInfo = () => {
      if (!localStorage.getItem('user')) {
        return history.push('/login');
      }
      const { id, token } = JSON.parse(localStorage.getItem('user'));
      setIdUser(id);
      setUserToken(token);
    };

    const fetchCustomerSales = async (id) => {
      const url = `http://www.localhost:3001/customer-orders/${id}`;
      // const customerId = { id: userId };
      // const header = { headers: { Authorization: `${userToken}` } };
      const salesArray = await axios.get(url);
      setCustomerSales(salesArray.data);
    };
    getUserInfo();
    fetchCustomerSales(idUser);
    setLoading(false);
  }, [idUser, history, userToken]);

  return (
    <div className="sales-container">
      { loading && <span>Loading...</span>}
      { !loading && <Header />}
      <div className="card-sale-content">
        { !loading && customerSales.map((el, index) => (
          <Card
            key={ el.id }
            saleId={ el.id }
            order={ `${index + 1}` }
            status={ el.status }
            saleDate={ el.saleDate }
            totalPrice={ el.totalPrice }
          />
        ))}
      </div>
    </div>
  );
}

export default CustomerOrders;
