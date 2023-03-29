import PropTypes from 'prop-types';

export default function Table({ list, type }) {
  const returnTotal = (quant, price) => {
    const mult = Number(quant) * Number(price);
    return mult.toFixed(2).toString().replace('.', ',');
  };

  const returnPrice = (price) => {
    const v = Number(price).toFixed(2).toString().replace('.', ',');
    return v;
  };

  const colorCell = 'font-bold text-white rounded flex'
  + ' items-center flex justify-center bg-gradi'
  + 'ent-to-r px-5 py-2 from-orange-700 to-yellow-600';
  const colorTd = 'border px-5 py-2 my-1 flex items-center justify-center text-center';

  return (
    <table>
      <thead>
        <tr className="w-screen grid grid-cols-5 gap-2 p-3">
          <th className={ colorCell }>Item</th>
          <th className={ colorCell }>Descrição</th>
          <th className={ colorCell }>Quantidade</th>
          <th className={ colorCell }>Valor Unitário</th>
          <th className={ colorCell }>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map((product, index) => (
            <tr key={ index } className="w-screen grid grid-cols-5 gap-2 px-3">
              <td
                className={ colorTd }
                data-testid={
                  `${type === 'seller' ? 'seller' : 'customer'}`
                  + '_order_details__element-'
                  + `order-table-item-number-${index + 1}`
                }
              >
                { product.id }
              </td>
              <td
                className={ colorTd }
                data-testid={
                  `${type === 'seller' ? 'seller' : 'customer'}`
                  + '_order_details__eleme'
                  + `nt-order-table-name-${index + 1}`
                }
              >
                { product.name }
              </td>
              <td
                className={ colorTd }
                data-testid={
                  `${type === 'seller' ? 'seller' : 'customer'}`
                  + '_order_details__element'
                  + `-order-table-quantity-${index + 1}`
                }
              >
                { product.quant }
              </td>
              <td
                className={ colorTd }
                data-testid={
                  `${type === 'seller' ? 'seller' : 'customer'}`
                  + '_order_details__element-order'
                  + `-table-unit-price-${index + 1}`
                }
              >
                { returnPrice(product.price) }
              </td>
              <td
                className={ colorTd }
                data-testid={
                  `${type === 'seller' ? 'seller' : 'customer'}`
                  + '_order_details__el'
                  + `ement-order-table-sub-total-${index + 1}`
                }
              >
                { returnTotal(product.quant, product.price) }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

Table.propTypes = {
  list: PropTypes.arrayOf().isRequired,
  type: PropTypes.string.isRequired,
};
