module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      saleId: { type: Sequelize.INTEGER, 
        field: 'sale_id',
        references: {
          model: 'sales',
          key: 'id',
        },
      },
      productId: { type: Sequelize.INTEGER,
        field: 'product_id',
        references: { model: 'products', key: 'id' },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('salesProducts');
   },
};
