const productService = require('../service/productService');
require('dotenv').config();

const findAllProduct = async (req, res) => {
  try {
    const product = await productService.findAll();
    if (!product) {
      return res.status(404).send('Not found');
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ message: `Try again later ${error.message}` });
  }
};

const findIdProduct = async (req, res) => {
  const product = await productService.findId(req.params.id);
  try {
    if (!product) {
      return res.status(404).send('Not found');
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ message: `Try again later ${error.message}` });
  }
};

module.exports = {
  findAllProduct,
  findIdProduct,
};