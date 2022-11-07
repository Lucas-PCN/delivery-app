module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id'
    },
    sellerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'seller_id'
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9,2),
      field: 'total_price'
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      field: 'delivery_address'
    },
    deliveryNumber: {
      type: DataTypes.STRING,
      field: 'delivery_number'
    },
    saleDate: {
      type: DataTypes.DATE,
      field: 'sale_date',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP()')
    },
    status: {
      type: DataTypes.STRING
    },
  },{
    timestamps: false,
    tableName: 'sales',
    underscored: true
  });

  Sales.associate = (models) => {
    models.sales.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'users'
    }),
    models.sales.belongsTo(models.users, {
      foreignKey: 'seller_id',
      as: 'seller'
    })
    // models.sales.hasMany(models.salesProducts, {
    //   foreignKey: 'sale_id',
    //   as: 'saleId'
    // })
  }

  return Sales;
};