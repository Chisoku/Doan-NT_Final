module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("order_items", {
      id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      order_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Orders", // Khóa ngoại liên kết với bảng Orders
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE" // Nếu xóa Order thì xóa luôn OrderItem
      },
      product_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Products", // Khóa ngoại liên kết với bảng Products
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE" // Nếu xóa Product thì xóa luôn OrderItem
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      price: { type: Sequelize.INTEGER, allowNull: false },
      note: { type: Sequelize.STRING },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("order_items");
  }
  module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.renameTable('cart_items', 'cartitems'); // Đổi tên bảng
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.renameTable('cartitems', 'cart_items'); // Đổi lại tên bảng nếu rollback
    }
  };
};
