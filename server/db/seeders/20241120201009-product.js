/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {  
        id: 1,
        name: 'Product A',
        description: 'Description for Product A',
        price: 100.0,
        discountedPrice: 80.0,
        sku: 'SKU001',
        photo: 'productA.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Product B',
        description: 'Description for Product B',
        price: 200.0,
        discountedPrice: 150.0,
        sku: 'SKU002',
        photo: 'productB.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Product C',
        description: 'Description for Product C',
        price: 300.0,
        discountedPrice: 250.0,
        sku: 'SKU003',
        photo: 'productC.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
