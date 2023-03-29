const { Sale, User, SaleProduct } = require('../database/models');

const createSalesProducts = async (id, list) => {
  try {
    list.forEach(async (array) => {
      await SaleProduct.create({
        saleId: id,
        productId: array.id,
        quantity: array.quant,
      });
    });
    return true;
  } catch (error) {
    return false;
  }
};

const create = async (body) => {
  const {
    userId, sellerId, totalPrice, deliveryAddress,
    deliveryNumber, list,
  } = body;
  const sales = await Sale
  .create({ userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate: Date.now(),
    status: 'Pendente',
  });
  const createSell = createSalesProducts(sales.dataValues.id, list);
  if (createSell) {
  return sales.dataValues.id;
  }
  return null;
};

const findId = async (sellerId) => {
  const products = await Sale.findOne({ where: { sellerId } });
  if (!products) throw new Error('Produto não existe');
  return products;
};

const userFindSales = async (userId) => {
  const sales = await Sale.findAll({ where: { userId } });
  if (!sales) throw new Error('Produto não existe');
  return sales;
};

const findSellerSales = async (sellerId) => {
  const sellers = await Sale.findAll({ where: { sellerId } });
  return sellers;
};

const findSaleById = async (id) => {
  const products = await Sale.findOne({
    include: [{ model: User,
    as: 'user',
    attributes: { exclude: ['password', 'id', 'email', 'role'] } },
  ],
    where: { id } });
  if (!products) throw new Error('Venda inexistente');
  return products; 
};

const findQuantity = async (saleId, productId) => {
  const response = await SaleProduct.findOne({ where: { saleId, productId } });
  if (!response) throw new Error('Não encontrado');
  return response.dataValues.quantity;
};

const findSaleProducts = async (saleId) => {
  const saleProducts = await SaleProduct.findAll({ where: { saleId } });
  if (!saleProducts) throw new Error('Produtos não encontrados');
  const response = saleProducts.map((element) => ({
      id: element.productId,
      quantity: element.quantity,
    }));
  return response;
};

const updateSaleStatus = async (saleId, status) => {
  const updatedSale = await Sale.update(
    { status },
    { where: { id: saleId } },
    );
  if (updatedSale) return updatedSale;
  return null;
};

module.exports = {
  create,
  findId,
  userFindSales,
  findSaleById,
  findSaleProducts,
  findQuantity,
  findSellerSales,
  updateSaleStatus,
};
