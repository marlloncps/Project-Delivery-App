const salesService = require('../service/salesService');
const productService = require('../service/productService');

const JwtAuth = require('../utils/Authentication');
const logicStatusSale = require('../utils/verifyStatusSale');
require('dotenv').config();

const createSales = async (req, res) => {
  const sales = await salesService.create(req.body);
  if (JwtAuth.validation(req.headers.authorization)) {
    try {
      return res.status(201).json({ id: sales });
    } catch (error) {
      return res.status(404).json({ message: 'Internal error' });
    }
  }
  return res.status(400).json({ message: 'Token not found' });
};

const findIdSales = async (req, res) => {
  const sale = await salesService.findId(req.params.id);
  try {
    if (!sale) {
      return res.status(404).send('Not found');
    }
    return res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Internal error' });
  }
};

const findUserSales = async (req, res) => {
  const sale = await salesService.userFindSales(req.params.id);
  try {
    if (!sale) {
      return res.status(404).send('Not found');
    }
    return res.status(200).json(sale);
  } catch (error) {
    res.status(400).json({ message: 'Intern error' });
  }
};

const findSellerSales = async (req, res) => {
  const sale = await salesService.findSellerSales(req.body.id);
  try {
    if (!sale) {
      return res.status(404).send('Not found');
    }
    return res.status(200).json(sale);
  } catch (error) {
    res.status(400).json({ message: 'Intern error' });
  }
};

const findSaleById = async (req, res) => {
  const sale = await salesService.findSaleById(req.params.id);
  try {
    if (!sale) {
      return res.status(404).send('Not found');
    }
    const productIds = await salesService.findSaleProducts(sale.id);
    const products = await productService.findProductsArray(productIds);
    const dataValue = JSON.parse(JSON.stringify(products));
    const listProducts = await Promise.all(dataValue.map(async (element) => {
      const quant = await salesService.findQuantity(sale.id, element.id);
      return { ...element, quant };
    }));
    const saleValue = JSON.parse(JSON.stringify(sale));
    return res.status(200).json({ ...saleValue, list: listProducts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSales = async (req, res) => {
  const { saleId, newStatus } = req.body;
  if (!saleId || !newStatus) {
    return res.status(400).json('Insira um ID de venda e um Status de venda'); 
  }
  const saleStatus = await salesService.findSaleById(saleId);
  if (!saleStatus) res.status(404).json({ message: 'Venda inexistente' });
  const sale = await salesService.updateSaleStatus(saleId, newStatus);
  try {
    const { status, message } = logicStatusSale(sale[0]);
    return res.status(status).json({ message });    
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  createSales,
  findIdSales,
  findUserSales,
  findSaleById,
  findSellerSales,
  updateSales,
};