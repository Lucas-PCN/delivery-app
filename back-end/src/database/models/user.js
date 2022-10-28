'use strict';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    timestamp: false,
    tableName: 'users',
    underscored: true
  });

  Users.associate = (models) => {
    models.user.hasMany(models.sales, {
      foreignKey: 'user_id',
    }),
    models.user.hasMany(models.sales, {
      foreignKey: 'seller_id',
    })
  }
  return Users;
};