import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import PropTypes from 'prop-types';

const icon = require('../images/play.png');

export default function Nav({ page, valuePrice }) {
  const [storage, setStorage] = useState({});
  const history = useHistory();

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('user'));
    if (list) {
      setStorage(list);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const returnButtonProducts = () => {
    const button = (
      <button
        className={
          'font-bold text-white rounded flex items-center bg-gradi'
          + 'ent-to-r px-5 py-2 ml-5 from-orange-700 to-yellow-600'
          + ' hover:from-yellow-600 hover:to-orange-700 transition-colors duration-500'
        }
        type="button"
        onClick={ () => history.push('/customer/checkout') }
        data-testid="customer_products__button-cart"
        disabled={ !valuePrice }
      >
        <BsCart4 className="mr-3 text-xl" />
        <span className="pr-2">R$</span>
        <span>
          { valuePrice.toFixed(2).toString().replace('.', ',') }
        </span>
      </button>
    );
    return button;
  };

  const redirectUser = () => {
    if (storage.role === 'seller') {
      history.push('/seller/orders');
    } else if (storage.role === 'customer') {
      history.push('/customer/orders');
    } else {
      history.push('/admin/manage');
    }
  };

  const returnButtonProdutos = () => {
    const spans = (
      <button
        className="pl-10"
        data-testid="customer_products__element-navbar-link-products"
        onClick={ () => history.push('/customer/products') }
        type="button"
      >
        <span
          className={ 'font-bold text-transparent bg-gradient-to-r from-'
            + 'orange-700 to-yellow-600 bg-clip-text'
            + ' hover:from-yellow-600 hover:to-orange-700 tran'
            + 'sition-colors duration-500' }
        >
          Produtos
        </span>
      </button>
    );
    return spans;
  };

  const returnSpan = () => {
    const spans = (
      <span
        className={
          'font-bold text-transparent bg-gradient-to-r px-10'
          + ' from-orange-700 to-yellow-600 bg-clip-text'
        }
      >
        |
      </span>
    );
    return spans;
  };

  return (
    <nav className="flex w-full justify-between my-2">
      <div className="flex items-center">
        <img
          src={ icon }
          alt="icone de fundo"
          className="z-40 w-20"
        />
        {
          storage.role === 'customer'
            ? returnButtonProdutos()
            : null
        }
        {
          storage.role === 'customer'
            ? returnSpan()
            : null
        }
        <button
          className=""
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ redirectUser }
        >
          <span
            className={ 'font-bold text-transparent bg-gradient-to-r'
              + ' from-orange-700 to-yellow-600 bg-clip-text'
              + ' hover:from-yellow-600 hover:to-orange-700'
              + ' transition-colors duration-500'
              + ` ${storage.role === 'seller' && 'ml-8'}` }
          >
            {
              storage.role === 'seller'
                ? 'Minhas Vendas'
                : 'Meus Pedidos'
            }
          </span>
        </button>
      </div>
      <div className="flex items-center">
        <div
          className="flex"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          <span
            className={
              'font-bold text-transparent bg-gradient'
              + '-to-r from-orange-700 to-yellow-600 bg-clip-text'
            }
          >
            {Object.keys(storage).length > 0 && storage.name}
          </span>
        </div>
        { page === 'products' && returnButtonProducts() }
        <button
          className={
            'font-bold text-white rounded bg-gradi'
            + 'ent-to-r p-3 mx-3 from-orange-700 to-yellow-600'
            + ' hover:from-yellow-600 hover:to-orange-700'
            + ' transition-colors duration-500'
          }
          onClick={ logout }
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
        >
          <FiLogOut />
        </button>
      </div>
    </nav>
  );
}

Nav.propTypes = {
  page: PropTypes.string.isRequired,
  valuePrice: PropTypes.number.isRequired,
};
