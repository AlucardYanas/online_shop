/* eslint-disable no-unused-vars */
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discountedPrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      sku: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'Products',
    }
  );
  return Product;
};
