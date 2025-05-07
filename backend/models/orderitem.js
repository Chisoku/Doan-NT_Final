'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Order, {
        foreignKey: "order_id",
      });

      // Mỗi OrderItem thuộc về một Product
      OrderItem.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
    }
  }
  OrderItem.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    note: DataTypes.STRING
}, {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items',
    timestamps: false // Tắt timestamps nếu DB không có created_at, updated_at
});

  return OrderItem;
};