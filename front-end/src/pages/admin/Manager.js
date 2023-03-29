import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import TableAdmin from '../../components/TableAdmin';
import fetch from '../../connection';

const regex = /\S+@\S+\.\S+/;
const icon = require('../../images/play.png');

export default function CustomerCheckout() {
  const [userStorage, setUserStorage] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [message, setMessage] = useState('');

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserStorage(user);
    const returnAllUsers = async () => {
      try {
        const rAllUsers = await axios.get(
          `${fetch()}/user`,
          {
            name,
            email,
            password,
            role,
          },
          {
            headers: { authorization: userStorage.token },
          },
        );
        setAllUsers(rAllUsers.data);
      } catch (error) {
        window.alert(`Erro: ${error.message}`);
      }
    };
    returnAllUsers();
  }, []);

  const updateUser = async () => {
    try {
      const allUsersReturn = await axios.get(
        `${fetch()}/user`,
        { name, email, password, role },
        { headers: { authorization: userStorage.token } },
      );
      setAllUsers(allUsersReturn.data);
    } catch (error) {
      window.alert(`Erro: ${error.message}`);
    }
  };

  const registerUser = async () => {
    try {
      await axios.post(
        `${fetch()}/user`,
        { name, email, password, role },
        { headers: { authorization: userStorage.token } },
      );
      updateUser();
      setName('');
      setEmail('');
      setPassword('');
      setRole('seller');
      const selectRole = document.getElementById('select-role');
      selectRole.selectedIndex = 'seller';
      setMessage('Usuário cadastrado com sucesso!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const enableButton = () => {
    const n1 = 12;
    const n2 = 6;
    const condition = name.length >= n1 && password.length >= n2 && regex.test(email);
    return !condition;
  };

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const returnMessageError = () => {
    const errorMessage = (
      <div
        data-testid="admin_manage__element-invalid-register"
      >
        { message }
      </div>
    );
    return errorMessage;
  };

  const colorCell = 'font-bold text-white rounded flex'
  + ' items-center flex justify-center bg-gradi'
  + 'ent-to-r px-5 py-2 from-orange-700 to-yellow-600';

  return (
    <div>
      <nav className="flex items-center justify-between">
        <div className="flex">
          <img
            src={ icon }
            alt="icone de fundo de tela"
            className="z-40 w-20"
          />
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
            className={ 'ml-5 font-bold text-transparent bg-gradient-to-r from-'
              + 'orange-700 to-yellow-600 bg-clip-text'
              + ' hover:from-yellow-600 hover:to-orange-700 tran'
              + 'sition-colors duration-500' }
            onClick={ () => history.push('/admin/manage') }
          >
            Gerenciar Usuários
          </button>
        </div>
        <div className="flex items-center justify-center">
          <div
            className={
              'font-bold text-transparent bg-gradient'
              + '-to-r from-orange-700 to-yellow-600 bg-clip-text'
            }
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { userStorage.name }
          </div>
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
      <div className="w-screen grid grid-cols-5 gap-2 px-3 mt-10">
        <input
          className="border border-orange-700 py-1 px-2"
          placeholder="Nome Completo"
          type="text"
          value={ name }
          onChange={ (e) => setName(e.target.value) }
          data-testid="admin_manage__input-name"
        />
        <input
          className="border border-orange-700 py-1 px-2"
          placeholder="E-mail"
          type="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          data-testid="admin_manage__input-email"
        />
        <input
          className="border border-orange-700 py-1 px-2"
          type="password"
          placeholder="Senha"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          data-testid="admin_manage__input-password"
        />
        <select
          className="border border-orange-700 py-1 px-2 text-center"
          data-testid="admin_manage__select-role"
          id="select-role"
          onChange={ (e) => setRole(e.target.value) }
          defaultValue="Vendedor"
        >
          <option value="seller">
            Vendedor
          </option>
          <option value="customer">
            Comprador
          </option>
          <option value="administrator">
            Administrador
          </option>
        </select>
        <button
          className={ 'p-1 py-2 text-white w-full z-30'
          + ' bg-gradient-to-r from-orange-700 to-yellow-600' }
          onClick={ registerUser }
          disabled={ enableButton() }
          type="button"
          data-testid="admin_manage__button-register"
        >
          Cadastrar
        </button>
      </div>
      <div className="w-full text-center my-5">
        {
          message !== 'Usuário cadastrado com sucesso!'
            ? returnMessageError()
            : null
        }
      </div>
      <p
        className={
          'w-full text-center mt-10 mb-3 text-4xl'
          + ' font-bold text-transparent bg-gradient'
          + '-to-r from-orange-700 to-yellow-600 bg-clip-text'
        }
      >
        Lista de Usuários
      </p>
      <table>
        <thead>
          <tr className="w-screen grid grid-cols-7 gap-2 p-3">
            <th className={ colorCell }>Item</th>
            <th className={ `${colorCell} col-span-2` }>Nome</th>
            <th className={ `${colorCell} col-span-2` }>Email</th>
            <th className={ colorCell }>Cargo</th>
            <th className={ colorCell }>Excluir Usuário</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((user, index) => (
              <TableAdmin
                key={ index }
                index={ index }
                user={ user }
                updateUser={ updateUser }
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
