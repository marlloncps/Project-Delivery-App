import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import fetch from '../connection';

const VALID_STATUS = 200;
const NUMBER = 1;

export default function Products() {
  const [listProducts, setListProducts] = useState([]);
  const [valuePrice, setValuePrice] = useState(0);

  useEffect(() => {
    const returnAllItems = async () => {
      try {
        const data = await axios.get(`${fetch()}/customer/products`);
        if (data.status === VALID_STATUS) {
          const valor = data.data.map((v) => {
            const obj = {
              ...v,
              quant: 0,
            };
            return obj;
          });
          setListProducts(valor);
        }
      } catch (error) {
        window.alert(`Erro: ${error.message}`);
        setListProducts([]);
      }
    };
    returnAllItems();
  }, []);

  const sortItems = (filterOff, filter) => {
    const newList = [...filterOff, ...filter].sort((a, b) => {
      if (a.id > b.id) {
        return NUMBER;
      }
      return -NUMBER;
    });
    return newList;
  };

  const addQuant = (index) => {
    const filterOff = listProducts.filter((fil, i) => index !== i);
    const filter = listProducts.filter((fil, i) => index === i);
    filter[0].quant += 1;
    const newList = sortItems(filterOff, filter);
    let valueTotal = 0;
    for (let i = 0; i < newList.length; i += 1) {
      valueTotal += Number(newList[i].price) * Number(newList[i].quant);
    }
    setValuePrice(valueTotal);
    setListProducts(newList);
    localStorage.setItem('car-shop', JSON.stringify(listProducts));
  };

  const insertQuant = (index, value) => {
    const filterOff = listProducts.filter((fil, i) => index !== i);
    const filter = listProducts.filter((fil, i) => index === i);
    filter[0].quant = Number(value);
    const newList = sortItems(filterOff, filter);
    let valueTotal = 0;
    for (let i = 0; i < newList.length; i += 1) {
      valueTotal += newList[i].price * newList[i].quant;
    }
    setValuePrice(valueTotal);
    setListProducts(newList);
    localStorage.setItem('car-shop', JSON.stringify(listProducts));
  };

  const remQuant = (index) => {
    const filterOff = listProducts.filter((fil, i) => index !== i);
    const filter = listProducts.filter((fil, i) => index === i);
    if (filter[0].quant === 0) {
      filter[0].quant = 0;
      setValuePrice(0);
    } else {
      filter[0].quant -= 1;
      setValuePrice(0);
    }
    const newList = sortItems(filterOff, filter);
    let valueTotal = 0;
    for (let i = 0; i < newList.length; i += 1) {
      valueTotal += Number(newList[i].price) * Number(newList[i].quant);
    }
    setValuePrice(valueTotal);
    setListProducts(newList);
    localStorage.setItem('car-shop', JSON.stringify(listProducts));
  };

  return (
    <div>
      <Nav
        page="products"
        valuePrice={ valuePrice }
      />
      <section
        className="flex flex-wrap justify-start mt-5 ml-10"
      >
        {
          listProducts.length > 0 && listProducts.map((list, index) => (
            <div
              key={ index }
              className={
                'w-1/6 m-2 border p-4 flex-col'
                + ' justify-center rounded flex'
                + ' items-center py-2 ml-5'
              }
            >
              <div className="w-full flex justify-center">
                <img
                  data-testid={ `customer_products__img-card-bg-image-${list.id}` }
                  className="h-52"
                  src={ `${fetch()}${list.urlImage}` }
                  alt={ `Imagem do produto ${list.id}` }
                />
              </div>
              <p
                data-testid={ `customer_products__element-card-title-${list.id}` }
                className="pt-3 text-center"
              >
                { list.name }
              </p>
              <p
                data-testid={ `customer_products__element-card-price-${list.id}` }
                className="text-center"
              >
                <span className="pr-2">R$</span>
                { list.price.replace('.', ',') }
              </p>
              <div className="flex justify-center pt-2">
                <button
                  data-testid={ `customer_products__button-card-rm-item-${list.id}` }
                  type="button"
                  className="px-3 py-1 border mr-1"
                  onClick={ () => remQuant(index) }
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-2/3 px-3 py-1 border text-black text-center"
                  data-testid={ `customer_products__input-card-quantity-${list.id}` }
                  value={ listProducts[index].quant }
                  onChange={ (e) => insertQuant(index, e.target.value) }
                />
                <button
                  data-testid={ `customer_products__button-card-add-item-${list.id}` }
                  onClick={ () => addQuant(index) }
                  type="button"
                  className="px-3 py-1 border ml-1"
                >
                  +
                </button>
              </div>
            </div>
          ))
        }
      </section>
    </div>
  );
}
