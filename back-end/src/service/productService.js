const { Product } = require('../database/models');

const findAll = async () => {
  const products = await Product.findAll();
  return products;
};

const findId = async (id) => {
  const products = await Product.findOne({ where: { id } });
  if (!products) throw new Error('Produto não existe');
  return products;
};

const findProductsArray = async (array) => {
  const consultArray = [];
  array.forEach((element) => consultArray.push(element.id));
  const products = await Product.findAll({ where: { id: consultArray } });
  if (!products) throw new Error('Produto não existe');
  return products;
};

module.exports = {
  findAll,
  findId,
  findProductsArray,
};
