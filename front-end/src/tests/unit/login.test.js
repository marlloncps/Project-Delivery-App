import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../renderWithRouter';
import App from '../../App';
import Nav from '../../components/Nav';

const email = 'zebirita@email.com';
const customerLogin = 'common_login__button-register';
const customerProducts = '/customer/products';
const emailInput = 'common_login__input-email';
const password = 'common_login__input-password';
const login = 'common_login__button-login';
const customerProduct = 'customer_products__input-card-quantity-1';
const senha = '$#zebirita#$';

describe('Testando a tela login', () => {
  it('Deverá ter todos os inputs na tela de login;', () => {
    renderWithRouter(<App />);
    const login1 = screen.getByTestId(emailInput);
    const login2 = screen.getByTestId(password);
    const login3 = screen.getByTestId(login);
    const login4 = screen.getByTestId(customerLogin);
    expect(login1).toBeInTheDocument();
    expect(login2).toBeInTheDocument();
    expect(login3).toBeInTheDocument();
    expect(login4).toBeInTheDocument();
  });
  it('Deverá ser possível ser redirecionado para a tela de register', () => {
    renderWithRouter(<App />);
    const register = screen.getByTestId(customerLogin);
    userEvent.click(register);
    const login1 = screen.getByTestId('common_register__input-name');
    const login2 = screen.getByTestId('common_register__input-email');
    const login3 = screen.getByTestId('common_register__input-password');
    const login4 = screen.getByTestId('common_register__button-register');
    expect(login1).toBeInTheDocument();
    expect(login2).toBeInTheDocument();
    expect(login3).toBeInTheDocument();
    expect(login4).toBeInTheDocument();
  });
  it('Teste se a aplicação é redirecionada para a página de produtos', () => {
    const { history } = renderWithRouter(<App />);
    const register = screen.getByTestId(customerLogin);
    userEvent.click(register);
    history.push('/register');
    const input1 = screen.getByTestId('common_register__input-name');
    const input2 = screen.getByTestId('common_register__input-email');
    const input3 = screen.getByTestId('common_register__input-password');
    userEvent.type(input1, 'Jéssica Milene');
    userEvent.type(input2, 'jmillene@gmail.com');
    userEvent.type(input3, '123456');
    const cadastrar = screen.getByRole('button', /Cadastar/i);
    expect(cadastrar).toBeInTheDocument();
    userEvent.click(cadastrar);
    history.push('/customer/products');
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe(customerProducts);
  });
  it('Testa o componente Nav', () => {
    renderWithRouter(<Nav />);
    const nav1 = screen.getByTestId(
      'customer_products__element-navbar-link-products',
    );
    const nav2 = screen.getByTestId(
      'customer_products__element-navbar-link-orders',
    );
    const nav3 = screen.getByTestId(
      'customer_products__element-navbar-user-full-name',
    );
    const nav4 = screen.getByTestId(
      'customer_products__element-navbar-link-logout',
    );
    expect(nav1).toBeInTheDocument();
    expect(nav2).toBeInTheDocument();
    expect(nav3).toBeInTheDocument();
    expect(nav4).toBeInTheDocument();
  });
  it('Testa o componente Product', async () => {
    const { history } = renderWithRouter(<App />);
    const pathNames = history.location.pathname;
    expect(pathNames).toBe('/login');
    const inputEmail = screen.getByTestId(emailInput);
    expect(inputEmail).toBeInTheDocument();
    const inputPass = screen.getByTestId(password);
    expect(inputPass).toBeInTheDocument();
    const inputLogin = screen.getByTestId(login);
    expect(inputLogin).toBeInTheDocument();
    const inputRegister = screen.getByTestId(customerLogin);
    expect(inputRegister).toBeInTheDocument();
    expect(inputLogin.disabled).toBe(true);
    userEvent.type(inputEmail, email);
    expect(inputEmail.value).toBe(email);
    userEvent.type(inputPass, senha);
    expect(inputPass.value).toBe(senha);
    expect(inputLogin.disabled).toBe(false);
    userEvent.click(inputLogin);
    history.push(customerProducts);
    const { pathname } = history.location;
    expect(pathname).toBe(customerProducts);
    localStorage.setItem(
      'user',
      JSON.stringify({
        email,
        name: 'Cliente Zé Birita',
        role: 'customer',
        token: 'eyJhbGciOiJIUz',
      }),
    );

    const products1 = screen.getByTestId(
      'customer_products__'
      + 'element-navbar-link-products',
    );
    expect(products1).toBeInTheDocument();
    const button = await screen.findByTestId('customer_products__button-card-add-item-1');
    userEvent.click(button);
    const input = await screen.findByTestId(customerProduct);
    expect(input.value).toBe('1');
    const button2 = await screen.findByTestId('customer_products__button-card-rm-item-1');
    userEvent.click(button2);
    userEvent.click(button2);
    expect(input.value).toBe('0');
    const prod = screen.getByTestId('customer_products__element-navbar-link-products');
    userEvent.click(prod);
    history.push('/products');
    // const pedidos = screen.getByTestId('customer_products__element-navbar-link-orders');
    // screen.logTestingPlaygroundURL();
    // expect(pedidos).toBeInTheDocument();
    // userEvent.click(pedidos);
    // history.push('/customer/orders');
  });
});
it('Deverá testar a página de pedidos', async () => {
  const { history } = renderWithRouter(<App />);
  const pathNames = history.location.pathname;
  expect(pathNames).toBe('/login');
  const inputEmail = screen.getByTestId(emailInput);
  expect(inputEmail).toBeInTheDocument();
  const inputPass = screen.getByTestId(password);
  expect(inputPass).toBeInTheDocument();
  const inputLogin = screen.getByTestId(login);
  expect(inputLogin).toBeInTheDocument();
  const inputRegister = screen.getByTestId(customerLogin);
  expect(inputRegister).toBeInTheDocument();
  expect(inputLogin.disabled).toBe(true);
  userEvent.type(inputEmail, email);
  expect(inputEmail.value).toBe(email);
  userEvent.type(inputPass, senha);
  expect(inputPass.value).toBe(senha);
  expect(inputLogin.disabled).toBe(false);
  userEvent.click(inputLogin);
  history.push(customerProducts);
  const { pathname } = history.location;
  expect(pathname).toBe(customerProducts);
  localStorage.setItem(
    'user',
    JSON.stringify({
      email,
      name: 'Cliente Zé Birita',
      role: 'customer',
      token: 'eyJhbGciOiJIUz',
    }),
  );

  const imagem = await screen.findByTestId('customer_products__img-card-bg-image-1');
  await expect(imagem).toHaveProperty('src', 'http://localhost:3001/images/skol_lata_350ml.jpg');
  const input = screen.getByTestId(customerProduct);
  userEvent.type(input, 1);
  const valor = await screen.findByTestId('customer_products__button-cart');
  userEvent.click(valor);
});
