import { useContext } from 'react';
import { AuthContext } from '../../providers/Auth';
import { updateCarsRemove } from '../../ultils/localStorage';

function Table() {
  const { cart, setCart } = useContext(AuthContext);

  const removeProduct = (index) => {
    console.log(index);
    const objs = cart.filter((obj) => obj !== cart[index]);
    setCart(objs);
    console.log(objs);
    updateCarsRemove(objs);
  };
  const headerTable = ['Item',
    'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total', 'Remover Item'];
  return (
    <table>
      <thead>
        <tr>
          { headerTable.map((name) => <th key={ name }>{ name }</th>)}
        </tr>
      </thead>
      <tbody>
        { cart.map((item, index) => (
          <tr key={ index }>
            <td
              data-testid={ `
              customer_checkout__element-order-table-item-number-${index}` }
            >
              { index + 1}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-name-${index}` }
            >
              { item.name }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
            >
              { item.quantity }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
            >
              { `R$ ${item.price.replace('.', ',')}` }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
            >
              { `R$ ${(Number(item.price) * Number(item.quantity))
                .toFixed(2).replace('.', ',')}` }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-remove-${index}` }
            >
              <button
                type="button"
                onClick={ () => removeProduct(index) }
              >
                Remover
              </button>
            </td>
          </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
