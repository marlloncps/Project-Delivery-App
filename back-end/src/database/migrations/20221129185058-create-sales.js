/* eslint-disable camelcase */ /* eslint-disable max-lines-per-function */ 
module.exports = {

   /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize')} Sequelize 
   * @returns 
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: { primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,  
      },
      userId: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
        model: 'users',
        key: 'id',
      } },
      sellerId: { 
        type: Sequelize.INTEGER,
         allowNull: false,
          field: 'seller_id',
          references: {
            model: 'users',
            key: 'id',
          } },
      totalPrice: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
        field: 'total_price',
      },
      deliveryAddress: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'delivery_address',
      },
      deliveryNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'delivery_number',
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'sale_date',
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('sales');
   },
};
