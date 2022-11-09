import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../providers/Auth';
import { updateCarsRemove } from '../../ultils/localStorage';

function Table({ isButtonNeeded, dataTest }) {
  const { cart, setCart, checkout, setCheckout } = useContext(AuthContext);
  const prefix = 'customer_checkout__';

  const removeProduct = (index) => {
    console.log(index);
    const objs = cart.filter((obj) => obj !== cart[index]);
    setCart(objs);
    updateCarsRemove(objs);
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
    <section>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {isButtonNeeded && <th>Remover Item</th>}
          </tr>
        </thead>
        <tbody>
          { cart.map((item, index) => (
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
                { `R$ ${(Number(item.price) * Number(item.quantity))
                  .toFixed(2).replace('.', ',')}` }
              </td>
              {isButtonNeeded && (
                <td
                  data-testid={ `${prefix}element-order-table-remove-${index}` }
                >
                  <button
                    type="button"
                    onClick={ () => removeProduct(index) }
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
        {`Total: R$${checkout.totalPrice}`}
      </div>
    </section>
  );
}

export default Table;

Table.propTypes = {
  isButtonNeeded: PropTypes.bool.isRequired,
  dataTest: PropTypes.string.isRequired,
};
