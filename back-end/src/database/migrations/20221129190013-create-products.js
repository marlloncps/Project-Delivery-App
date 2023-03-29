module.exports = {

   /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize')} Sequelize 
   * @returns 
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: { primaryKey: true,
type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,  
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: false,
      },
      urlImage: {
        type: Sequelize.STRING(200),
        field: 'url_image',
      } }); 
},

  async down(queryInterface) {
    await queryInterface.dropTable('products');
   },
};
