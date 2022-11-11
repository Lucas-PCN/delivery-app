import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import SellerHeader from '../../components/SellerHeader';
import Card from '../../components/SellerOrders/Card';

function SellerOrders() {
  const [sellerOrder, setSellerOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  // const history = useHistory();

  useEffect(() => {
    const fetchSellerOrders = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const instance = axios.create({
        baseURL: 'http://localhost:3001/',
        headers: { authorization: user.token },
      });

      const response = await instance.get('/seller/orders')
        .then((res) => res.data).catch((err) => err);

      setSellerOrder(response);
    };

    fetchSellerOrders();
    setLoading(false);
  }, []);

  return (
    <div className="sales-container">
      { loading && <span>Loading...</span>}
      { !loading && <SellerHeader />}
      <div className="cards-container">
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
    </div>
  );
}

export default SellerOrders;
