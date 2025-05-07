import { Sequelize } from "sequelize";
import db from "../models/index.js";

export async function getOrderItems(req, res) {
  const { search = "" } = req.query;

  let whereCondition = {};
  if (search) {
    whereCondition = {
      [Sequelize.Op.or]: [
        { id: { [Sequelize.Op.like]: `%${search}%` } },
        { orderId: { [Sequelize.Op.like]: `%${search}%` } },
        { productId: { [Sequelize.Op.like]: `%${search}%` } }
      ]
    };
  }

  const orderItems = await db.OrderItem.findAll({
    where: whereCondition,
    include: [
      { model: db.Product, attributes: ["name", "price"] }, // Lấy thông tin sản phẩm
      { model: db.Order, attributes: ["status"] } // Lấy trạng thái đơn hàng
    ],
    order: [["createdAt", "DESC"]]
  });

  res.status(200).json({
    message: "Lấy danh sách sản phẩm trong đơn hàng thành công",
    data: orderItems,
  });
}

export async function getOrderItemById(req, res) {
  const { id } = req.params;
  const orderItem = await db.OrderItem.findByPk(id, {
    include: [{ model: db.Product, attributes: ["name", "price"] }]
  });

  if (!orderItem) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm trong đơn hàng" });
  }

  res.status(200).json({
    message: "Lấy thông tin sản phẩm trong đơn hàng thành công",
    data: orderItem,
  });
}

export async function insertOrderItem(req, res) {
  const orderItem = await db.OrderItem.create(req.body);

  res.status(201).json({
    message: "Thêm sản phẩm vào đơn hàng thành công",
    data: orderItem,
  });
}

export async function updateOrderItem(req, res) {
  const { id } = req.params;
  const orderItem = await db.OrderItem.findByPk(id);

  if (!orderItem) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm trong đơn hàng" });
  }

  await orderItem.update(req.body);

  res.status(200).json({
    message: "Cập nhật sản phẩm trong đơn hàng thành công",
    data: orderItem,
  });
}

export async function deleteOrderItem(req, res) {
  const { id } = req.params;
  const orderItem = await db.OrderItem.findByPk(id);

  if (!orderItem) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm trong đơn hàng" });
  }

  await orderItem.destroy();

  res.status(200).json({
    message: "Xóa sản phẩm khỏi đơn hàng thành công",
    data: orderItem,
  });
}
 

export async function updateOrderItemQuantity(req, res) {
  const { id } = req.params;
  //console.log("ciciciciccicicicic:", req.body);

  const { quantityChange } = req.body; // quantityChange là số lượng bạn muốn thay đổi (+ hoặc -)

  try {
    // Kiểm tra xem có OrderItem không
    const orderItem = await db.OrderItem.findByPk(id);

    if (!orderItem) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm trong đơn hàng" });
    }

    // Tính toán số lượng mới: cộng hoặc trừ theo quantityChange
    const newQuantity = orderItem.quantity + quantityChange;

    // Kiểm tra số lượng hợp lệ (số lượng phải >= 1)
    if (newQuantity < 1) {
      return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
    }

    // Cập nhật số lượng
    orderItem.quantity = newQuantity;
    await orderItem.save();

    res.status(200).json({
      message: "Cập nhật số lượng sản phẩm thành công",
      data: orderItem,
    });
  } catch (error) {
    console.error("Lỗi cập nhật số lượng:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật số lượng" });
  }
}


