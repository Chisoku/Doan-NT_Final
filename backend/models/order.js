'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    content: DataTypes.TEXT,
    payment_type: DataTypes.STRING,
    total_price: DataTypes.FLOAT,
    shipping_address: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,   // Dùng timestamps nhưng không đổi tên cột
    underscored: false  // Giữ nguyên createdAt, updatedAt
});

  return Order;
};