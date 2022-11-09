import axios from 'axios';
import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Delivery from '../../components/Delivery';
import Header from '../../components/Header';
import Table from '../../components/Table';
import { AuthContext } from '../../providers/Auth';
import './style.css';

function Checkout() {
  const history = useHistory();
  const {
    cart,
    // setUser,
    // user,
    setSellers,
    checkout,
    setCart,
    setCheckout,
    setErro, setErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'));
    const instance = axios.create({
      baseURL: 'http://localhost:3001/',
      headers: { authorization: token.token },
    });
    const getManage = async () => {
      const response = await instance.get('/admin/manage')
        .then((res) => res.data)
        .catch((err) => {
          setErro(true);
          console.log('error', err);
          setErrorMessage(err.message);
        });

      const manages = await response.filter(({ role }) => role === 'seller');
      setSellers(manages);
      setCheckout({ ...checkout, sellerId: manages[0].id });
      setCart(JSON.parse(localStorage.getItem('cart')));
    };
    getManage();
  }, []);

  const handleSubmit = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    axios
      .post('http://localhost:3001/checkout', {
        userId: user.id,
        sellerId: checkout.sellerId,
        totalPrice: checkout.totalPrice.replace(',', '.'),
        deliveryAddress: checkout.address,
        deliveryNumber: checkout.number,
        products: cart,
      }, { headers: { authorization: user.token } })
      .then((res) => {
        console.log('RESPONSE', res);
        history.push({ pathname: `/customer/orders/${res.data.id}`, state: res.data.id });
      })
      .catch((err) => {
        setErro(true);
        console.log(err);
        setErrorMessage(err.message);
        // document.location.reload();
      });
  };

  useEffect(() => {
    const totalPrice = () => {
      const total = cart
        .reduce((acc, cur) => acc + (Number(cur.price) * cur.quantity), 0);
      setCheckout({ ...checkout, totalPrice: total.toFixed(2).replace('.', ',') });
    };
    totalPrice();
  }, [cart]);

  return (
    <div className="checkout-container">
      <Header />
      <div className="checkout-content">
        <div className="request-content">
          <p className="order-title">Finalizar Pedido</p>
          <div className="list-products-table">
            <Table isButtonNeeded />
          </div>
          <div
            data-testid="customer_checkout__element-order-total-price"
            className="total"
          >
            {`Total: R$${checkout.totalPrice}`}
          </div>
        </div>
        <div className="delivery-content">
          <p>Detalhes e Endereço para Entrega</p>
          <Delivery />
          <button
            type="button"
            onClick={ handleSubmit }
            data-testid="customer_checkout__button-submit-order"
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
