export const info = [{
  name: 'Cerveja',
  quantity: 3,
  price: 'R$3.50',
  total: '10.50',
},
{
  name: 'Refri',
  quantity: 5,
  price: 'R$7.00',
  total: '35',
}];

function Table() {
  const removeProduct = (index) => {
    console.log(index);
    const objs = info.filter((obj) => obj !== info[index]);
    console.log(objs);
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
        { info.map((item, index) => (
          <tr key={ index }>
            <th
              data-testid={ `customer_checkout__
              element-order-table-item-number-${index}` }
            >
              { index + 1}
            </th>
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
              { item.price }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
            >
              { `R$ ${Number(item.total).toFixed(2)}` }
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
