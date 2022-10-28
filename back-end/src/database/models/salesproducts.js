module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'sales',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      field: 'sale_id'
    },
    productId: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'products',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      field: 'product_id'
    },
    quantity: DataTypes.INTEGER,
  },{
    timestamps: false,
    tableName: 'salesProducts',
    underscored: true
  });

  SalesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      foreignKey: 'product_id',
      otherKey: 'sale_id',
      through: SalesProducts,
      as: 'products'
    });
  
    models.products.belongsToMany(models.sales, {
      foreignKey: 'sale_id',
      otherKey: 'product_id',
      through: SalesProducts,
      as: 'sales'
    });
  }

  return SalesProducts;
};