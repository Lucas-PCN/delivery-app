import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import SellerHeader from '../../components/SellerHeader';
import Card from '../../components/SellerOrders/Card';

function SellerOrders() {
  const [sellerOrder, setSellerOrder] = useState([]);
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
    const fetchSellerOrders = async (id) => {
      const url = `http://www.localhost:3001/customer-orders/${id}`;
      // const header = { headers: { Authorization: `${token}` } };
      const ordersArray = await axios.get(url);
      setSellerOrder(ordersArray.data);
    };
    getUserInfo();
    fetchSellerOrders(idUser);
    setLoading(false);
  }, [idUser, history, userToken]);

  return (
    <div className="sales-container">
      { loading && <span>Loading...</span>}
      { !loading && <SellerHeader />}
      { !loading && sellerOrder.map((el, index) => (
        <Card
          key={ el.id }
          saleId={ el.id }
          order={ `${index + 1}` }
          status={ el.status }
          saleDate={ el.saleDate }
          totalPrice={ el.totalPrice }
          deliveryAddress={ el.deliveryAddress }
          deliveryNumber={ el.deliveryNumber }
        />
      ))}
    </div>
  );
}

export default SellerOrders;
