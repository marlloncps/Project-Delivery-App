/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, { foreignKey: 'userId', as: 'user' });
    User.hasMany(models.Sale, { foreignKey: 'sellerId', as: 'seller' });
  };

  return User;
};
