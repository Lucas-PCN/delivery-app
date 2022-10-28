'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4,2),
    urlImage: {
      type: DataTypes.STRING,
      field: 'url_image'
    },
  },{
    timestamp: false,
    tableName: 'products',
    underscored: true
  });

  Products.associate = (models) => {
    models.products.hasMany(models.salesProducts, {
      foreignKey: 'produt_id'
    })
  }

  return Products;
};