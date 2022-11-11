import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../providers/Auth';
import { updateCarsRemove } from '../../ultils/localStorage';

function Table({ isPage, dataTest }) {
  const { pedido, orderCustomer } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [totalValues, setTotalValues] = useState('');
  const prefix = 'customer_checkout__';

  const removeProduct = (id) => {
    console.log(id);
    const objs = products.filter((obj) => obj.id !== id);
    setProducts(objs);
    updateCarsRemove(objs);
  };

  useEffect(() => {
    if (isPage === 'checkout') {
      const cart = JSON.parse(localStorage.getItem('cart'));
      return setProducts(cart);
    }

    if (isPage === 'customer') {
      return setProducts(orderCustomer);
    }
    return setProducts(pedido);
  }, [isPage, pedido, orderCustomer]);

  useEffect(() => {
    const totalPrice = () => {
      if (isPage === 'checkout') {
        const total = products.reduce((acc, cur) => acc + (
          Number(cur.price) * cur.quantity), 0);
        return setTotalValues(total.toFixed(2).replace('.', ','));
      }
      const total = products.reduce((acc, cur) => acc + (
        Number(cur.price) * cur.salesProducts.quantity), 0);
      return setTotalValues(total.toFixed(2).replace('.', ','));
    };
    totalPrice();
  }, [isPage, products]);

  return (
    <section className="table-container">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {(isPage === 'checkout') && <th>Remover Item</th>}
          </tr>
        </thead>
        <tbody>
          { products.map((item, index) => (
            <tr key={ index }>
              <td
                data-testid={ `${prefix}element-order-table-item-number-${index}` }
              >
                { index + 1}
              </td>
              <td
                data-testid={ `${prefix}element-order-table-name-${index}` }
              >
                { item.name }
              </td>
              <td
                data-testid={ `${prefix}element-order-table-quantity-${index}` }
              >
                { item.quantity }
              </td>
              <td
                data-testid={ `${prefix}element-order-table-unit-price-${index}` }
              >
                { `R$ ${item.price.replace('.', ',')}` }
              </td>
              <td
                data-testid={ `${prefix}element-order-table-sub-total-${index}` }
              >
                {(isPage === 'checkout') ? `R$ ${
                  (Number(item.price) * Number(item.quantity))
                    .toFixed(2).replace('.', ',')
                }` : `R$ ${
                  (Number(item.price) * Number(item.salesProducts.quantity))
                    .toFixed(2).replace('.', ',')
                }`}
              </td>
              {(isPage === 'checkout') && (
                <td
                  data-testid={ `${prefix}element-order-table-remove-${index}` }
                >
                  <button
                    type="button"
                    onClick={ () => removeProduct(item.id) }
                  >
                    Remover
                  </button>
                </td>
              )}
            </tr>))}
        </tbody>
      </table>
      <div
        data-testid={ `${dataTest}__element-order-total-price` }
        className="total"
      >
        {`Total: R$${totalValues}`}
      </div>
    </section>
  );
}

export default Table;

Table.propTypes = {
  isPage: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
};
