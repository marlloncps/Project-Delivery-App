const sellersService = require('../service/sellersService');
require('dotenv').config();

const findAllSellers = async (req, res) => {
  try {
  const Sellers = await sellersService.findAll('seller');
  if (!Sellers) {
    return res.status(404).send('Not found');
  }
  return res.status(200).json(Sellers);
  } catch (error) {
    return res.status(400).json({ message: `Try again later ${error.message}` });
  }
};

module.exports = {
  findAllSellers,
};