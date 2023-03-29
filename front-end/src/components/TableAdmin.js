import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import fetch from '../connection';

export default function TableAdmin({ index, user, updateUser }) {
  const [userStorage, setUserStorage] = useState('');

  useEffect(() => {
    const userSt = JSON.parse(localStorage.getItem('user'));
    setUserStorage(userSt);
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `${fetch()}/user/${id}`,
        {
          headers: { authorization: userStorage.token },
        },
      );
      updateUser();
      window.alert('Usuário apagado com sucesso!');
    } catch (error) {
      window.alert(`Erro: ${error.message}`);
    }
  };

  const returnRole = () => {
    if (user.role === 'customer') {
      return 'Comprador';
    }
    if (user.role === 'seller') {
      return 'Vendedor';
    }
    return 'Administrador';
  };

  const colorTd = 'border px-5 py-2 my-1 flex items-center'
    + ' justify-center text-center';

  return (
    <tr key={ index } className="w-screen grid grid-cols-7 gap-2 px-3">
      <td
        className={ colorTd }
        data-testid={
          'admin_manage__element-user-'
          + `table-item-number-${index}`
        }
      >
        { index + 1 }
      </td>
      <td
        className={ `${colorTd} col-span-2` }
        data-testid={ `admin_manage__element-user-table-name-${index}` }
      >
        { user.name }
      </td>
      <td
        className={ `${colorTd} col-span-2` }
        data-testid={ `admin_manage__element-user-table-email-${index}` }
      >
        { user.email }
      </td>
      <td
        className={ colorTd }
        data-testid={ `admin_manage__element-user-table-role-${index}` }
      >
        { returnRole() }
      </td>
      <td className="border my-1 flex items-center justify-center text-center">
        <button
          type="button"
          className={
            'h-full w-full'
            + ' flex items-center justify-center'
            + ' text-center bg-white hover:bg-red-600'
            + ' transition-all duration-1000 text-black hover:text-white'
          }
          onClick={ () => deleteUser(user.id) }
          data-testid={ `admin_manage__element-user-table-remove-${index}` }
        >
          Excluir
        </button>
      </td>
    </tr>
  );
}

TableAdmin.propTypes = {
  index: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};
