/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
module.exports = (Sequelize, DataTypes) => {
  const Sale = Sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    deliveryNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
    },
  }, {
    tableName: 'sales',
    timestamps: false,
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'sellers' });
  };

  return Sale;
};
