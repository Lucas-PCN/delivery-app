module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4,2),
    urlImage: {
      type: DataTypes.STRING,
      field: 'url_image'
    },
  },{
    timestamps: false,
    tableName: 'products',
    underscored: true
  });

  // Products.associate = (models) => {
  //   models.products.hasMany(models.salesProducts, {
  //     foreignKey: 'product_id'
  //   })
  // }

  return Products;
};