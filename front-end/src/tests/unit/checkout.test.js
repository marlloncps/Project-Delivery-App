import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../renderWithRouter';
import App from '../../App';

const customerLogin = 'common_login__button-register';
const email = 'zebirita@email.com';
const customerProducts = '/customer/products';

describe('Testando a tela checkout', () => {
  it('Deverá testa a tela de checkout;', async () => {
    const { history } = renderWithRouter(<App />);
    const pathNames = history.location.pathname;
    expect(pathNames).toBe('/login');
    const inputEmail = screen.getByTestId('common_login__input-email');
    expect(inputEmail).toBeInTheDocument();
    const inputPass = screen.getByTestId('common_login__input-password');
    expect(inputPass).toBeInTheDocument();
    const inputLogin = screen.getByTestId('common_login__button-login');
    expect(inputLogin).toBeInTheDocument();
    const inputRegister = screen.getByTestId(customerLogin);
    expect(inputRegister).toBeInTheDocument();
    expect(inputLogin.disabled).toBe(true);
    userEvent.type(inputEmail, email);
    expect(inputEmail.value).toBe(email);
    userEvent.type(inputPass, '$#zebirita#$');
    expect(inputPass.value).toBe('$#zebirita#$');
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
    expect(imagem).toHaveProperty('src', 'http://localhost:3001/images/skol_lata_350ml.jpg');
    const input1 = screen.getByTestId('customer_products__input-card-quantity-1');
    userEvent.type(input1, 1);
    const valor = await screen.findByTestId('customer_products__button-cart');
    userEvent.click(valor);
    localStorage.setItem(
      'car-shop',
      JSON.stringify([{ id: 1,
        name: 'Skol Lata 250ml',
        price: '2.20',
        urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
        quant: 4,
      },
      { id: 2,
        name: 'Heineken 600ml',
        price: '7.50',
        urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
        quant: 0,
      },
      { id: 3,
        name: 'Antarctica Pilsen 300ml',
        price: '2.49',
        urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
        quant: 0,
      },
      { id: 4,
        name: 'Brahma 600ml',
        price: '7.50',
        urlImage: 'http://localhost:3001/images/brahma_600ml.jpg',
        quant: 0,
      },
      { id: 5,
        name: 'Skol 269ml',
        price: '2.19',
        urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
        quant: 0 }, { id: 6,
        name: 'Skol Beats Senses 313ml',
        price: '4.49',
        urlImage: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
        quant: 0,
      },
      { id: 7,
        name: 'Becks 330ml',
        price: '4.99',
        urlImage: 'http://localhost:3001/images/becks_330ml.jpg',
        quant: 0 },
      {
        id: 8,
        name: 'Brahma Duplo Malte 350ml',
        price: '2.79',
        urlImage: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
        quant: 0,
      },
      { id: 9,
        name: 'Becks 600ml',
        price: '8.89',
        urlImage: 'http://localhost:3001/images/becks_600ml.jpg',
        quant: 0,
      },
      {
        id: 10,
        name: 'Skol Beats Senses 269ml',
        price: '3.57',
        urlImage: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
        quant: 0 },
      {
        id: 11,
        name: 'Stella Artois 275ml',
        price: '3.49',
        urlImage: 'http://localhost:3001/images/stella_artois_275ml.jpg',
        quant: 0 }]),
    );

    history.push('/customer/checkout');
    const remove = await screen.findAllByRole('button', /Remover/i);
    expect(remove[0]).toBeInTheDocument();
    userEvent.click(remove[0]);
  });
});
