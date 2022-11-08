module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,

    },
    productId: {
      type: DataTypes.INTEGER, 
      primaryKey: true,

    },
    quantity: DataTypes.INTEGER,
  },{
    timestamps: false,
    tableName: 'sales_products',
    underscored: true
  });

  SalesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      foreignKey: 'sale_id',
      otherKey: 'product_id',
      through: SalesProducts,
      as: 'products'
    });
  
    models.products.belongsToMany(models.sales, {
      foreignKey: 'product_id',
      otherKey: 'sale_id',
      through: SalesProducts,
      as: 'sales'
    });
  }

  return SalesProducts;
};