/* eslint-disable camelcase */

/* eslint-disable max-lines-per-function */
module.exports = (Sequelize, DataTypes) => {
  const SaleProduct = Sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sales',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'sales_products',
    timestamps: false,
    underscored: true,
  });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
       as: 'sales',
       through: SaleProduct,
       foreignKey: 'saleId',
       otherKey: 'productId' });
    models.Product.belongsToMany(models.Sale, { 
      as: 'products', 
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId' });
  };

  return SaleProduct;
};
