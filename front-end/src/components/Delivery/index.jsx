import { useContext } from 'react';
import { AuthContext } from '../../providers/Auth';

export default function Delivery() {
  const { checkout, setCheckout, sellers } = useContext(AuthContext);
  return (
    <form>
      <label htmlFor="seller">
        <p>P.Vendedora Responsável:</p>
        <select
          name="seller"
          data-testid="customer_checkout__select-seller"
          value={ checkout.sellerId }
          onChange={ ({ target }) => setCheckout({
            ...checkout,
            sellerId: Number(target.value),
            seller: sellers.find(({ id }) => Number(target.value) === id).name,
          }) }
        >
          { sellers.map((seller) => (
            <option key={ seller.id } value={ seller.id }>
              { seller.name }
            </option>))}
        </select>
      </label>
      <label htmlFor="address">
        <p>Endereço</p>
        <input
          name="address"
          type="text"
          // placeholder=""
          value={ checkout.address }
          onChange={
            ({ target }) => setCheckout({
              ...checkout, address: target.value })
          }
          data-testid="customer_checkout__input-address"
        />
      </label>
      <label htmlFor="number">
        <p>Número</p>
        <input
          name="number"
          type="number"
          // placeholder=""
          value={ checkout.number }
          onChange={
            ({ target }) => setCheckout({
              ...checkout, number: target.value,
            })
          }
          data-testid="customer_checkout__input-address-number"
        />
      </label>
    </form>
  );
}
