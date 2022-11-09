import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../../providers/Auth';
import { updateCarsRemove } from '../../ultils/localStorage';

function Table({ isButtonNeeded }) {
  const { cart, setCart } = useContext(AuthContext);
  const prefix = 'customer_checkout__';

  const removeProduct = (index) => {
    console.log(index);
    const objs = cart.filter((obj) => obj !== cart[index]);
    setCart(objs);
    updateCarsRemove(objs);
  };

  const total = cart.reduce((acc, curr) => acc + Number(curr.subTotal), 0);
  const totalCorrected = total.toFixed(2).replace('.', ',');

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
      <h3
        data-testid={ `${prefix}element-order-total-price` }
      >
        {`Total: R$${totalCorrected}`}

      </h3>
    </section>
  );
}

export default Table;

Table.propTypes = {
  isButtonNeeded: PropTypes.bool.isRequired,
};
