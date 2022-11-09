import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import SaleCard from '../../components/CustomerOrders/SaleCard';

function Sales() {
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
      console.log(salesArray);
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
      { !loading && customerSales.map((el) => (
        <SaleCard
          key={ el.id }
          saleId={ el.id }
          status={ el.status }
          saleDate={ el.saleDate }
          totalPrice={ el.totalPrice }
        />
      ))}
    </div>
  );
}

export default Sales;
