/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
module.exports = (Sequelize, DataTypes) => {
  const Product = Sequelize.define('Product', {
    id: { primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,  
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
    urlImage: {
      type: DataTypes.STRING(200),
      allowNull: false,
    }, 
  }, {
    tableName: 'products',
    timestamps: false,
    underscored: true,
  });

  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct, { foreignKey: 'productId', as: 'product' });
  };

  return Product;
};
