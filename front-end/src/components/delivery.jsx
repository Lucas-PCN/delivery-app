const vendedores = [{ name: 'fulana pereira ' }];
export default function Delivery() {
  return (
    <form>
      <label htmlFor="vendedora">
        <p>P.Vendedora Responsável:</p>
        <select name="vendedora" data-testid="customer_checkout__select-seller">
          { vendedores.map(({ name }) => (
            <option key={ name }>
              { name }
            </option>))}
        </select>
      </label>
      <label htmlFor="endereco">
        <p>Endereço</p>
        <input
          name="endereco"
          type="text"
          // placeholder=""
          // onChange=
          data-testid="customer_checkout__input-address"
        />
      </label>
      <label htmlFor="numero">
        <p>Número</p>
        <input
          name="numero"
          type="number"
          // placeholder=""
          // onChange=
          data-testid="customer_checkout__input-address-number"
        />
      </label>
    </form>
  );
}
