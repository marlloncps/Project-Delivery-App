import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Carousel from '../components/Carousel';
import fetch from '../connection';

const background = require('../images/8.jpg');
const icon = require('../images/play.png');

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState(false);
  const [isButtonClicked, setButton] = useState(false);
  const CREATED_STATUS = 201;
  const BAD_STATUS = 400;
  const INVALID_STATUS = 409;
  const history = useHistory();

  const enableButton = () => {
    const number = 6;
    const validateEmail = /\S+@\S+\.\S+/;
    const vEmail = !email || !validateEmail.test(email) || email === '';
    const vPassword = !password || password.length < number;
    const vName = !name || name === '' || name.length < 2 * number;
    return vEmail || vPassword || vName;
  };

  const validateUser = async () => {
    try {
      setButton(true);
      const vUser = await axios.post(`${fetch()}/register`, { name, email, password });
      const vEmail = await axios.post(`${fetch()}/login`, { email, password });
      if (vUser.status === CREATED_STATUS) {
        setValidation(true);
        history.push('/customer/products');
        localStorage.setItem('user', JSON.stringify(vEmail.data));
      }
      if (vUser.status === BAD_STATUS || vUser.status === INVALID_STATUS) {
        setValidation(false);
      }
    } catch (error) {
      window.alert(`Erro: ${error.message}`);
      setValidation(false);
    }
  };

  return (
    <div className="flex w-full h-screen relative">
      <div className="w-full h-full grid grid-cols-4 grid-rows-2 gap-2 bg-white p-2">
        <div className="row-span-2 col-span-1 gap-2 h-full w-full">
          <Carousel
            className="h-full w-full"
            list={ ['1', '2', '3'] }
            data={ { time: '3500', direction: 'vertical', reverse: true } }
          />
        </div>
        <div className="row-span-1 col-span-2 gap-2 h-full w-full">
          <Carousel
            className="h-full w-full"
            list={ ['4', '5', '6'] }
            data={ { time: '6000', direction: 'horizontal', reverse: false } }
          />
        </div>
        <div className="row-span-1 col-span-1 gap-2 h-full w-full">
          <Carousel
            className="h-full w-full"
            list={ ['7', '8', '9'] }
            data={ { time: '7000', direction: 'vertical', reverse: false } }
          />
        </div>
        <div className="row-span-1 col-span-1 gap-2 h-full w-full">
          <Carousel
            className="h-full w-full"
            list={ ['10', '11', '12'] }
            data={ { time: '4500', direction: 'horizontal', reverse: false } }
          />
        </div>
        <div className="row-span-1 col-span-2 gap-2 h-full w-full">
          <Carousel
            className="h-full w-full"
            list={ ['13', '14', '15'] }
            data={ { time: '4000', direction: 'horizontal', reverse: false } }
          />
        </div>
      </div>
      <div className="absolute flex items-center justify-center z-30 w-full h-screen">
        <div
          className={
            'p-8 pb-12 relative'
            + ' flex flex-col items-center justify-center'
            + ' glasmorphism absolute z-3'
          }
        >
          <img
            src={ background }
            alt="degradê de fundo"
            className={
              'absolute h-full w-full object-cover'
              + ' opacity-90 border-white border-8'
            }
          />
          <div
            className={
              'absolute h-full w-full object-cover'
              + ' bg-gradient-to-b from-white to-transparent'
            }
          />
          <img
            src={ icon }
            alt="icone de fundo"
            className="z-40 w-20 mt-7"
          />
          <p
            className={
              'bg-gradient-to-r from-orange-700 to-yellow-600'
            + ' font-bold text-transparent bg-clip-text z-30 mb-7'
            }
          >
            Delivery App
          </p>
          <input
            type="name"
            placeholder="Nome Completo"
            className="border py-2 px-2 my-2 z-30 text-center"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            data-testid="common_register__input-name"
          />
          <input
            type="email"
            placeholder="E-mail"
            className="border py-2 px-2 my-2 z-30 text-center"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            data-testid="common_register__input-email"
          />
          <input
            type="password"
            placeholder="Senha"
            className="border py-2 px-2 my-2 z-30 text-center"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            data-testid="common_register__input-password"
          />
          <button
            disabled={ enableButton() }
            onClick={ validateUser }
            className={ 'p-1 py-2 m-1 text-white w-full z-30'
            + ' bg-gradient-to-r from-orange-700 to-yellow-600' }
            type="button"
            data-testid="common_register__button-register"
          >
            Cadastrar
          </button>
          {
            (!validation && isButtonClicked)
              ? (
                <p data-testid="common_register__element-invalid_register">
                  Nome ou e-mail inválidos.
                </p>)
              : null
          }
        </div>
      </div>
    </div>
  );
}
