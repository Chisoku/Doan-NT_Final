"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }

  Notification.init(
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      msg: { type: DataTypes.STRING, allowNull: false },
      is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
      type: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Notification",
      tableName: "notifications",
      timestamps: true, // Sequelize sẽ tự động tạo `createdAt` và `updatedAt`
      underscored: true, // Chuyển camelCase thành snake_case cho tên cột
    }
  );

  return Notification;
};
