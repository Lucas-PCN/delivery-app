import Delivery from '../../components/delivery';
import Table, { info } from '../../components/table';
import './style.css';

function Checkout() {
  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="request-content">
          <p className="order-title">Finalizar Pedido</p>
          <div className="list-products">
            <Table />
          </div>
          <div
            data-testid="customer_checkout__element-order-total-price"
            className="total"
          >
            {`Total ${
              info.reduce((prev, cur) => Number(prev.total) + Number(cur.total))}`}
          </div>
        </div>
        <div className="delivery-content">
          <p>Detalhes e Endereço para Entrega</p>
          <Delivery />
          <button
            type="button"
            onClick={ () => handleSubmit() }
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
