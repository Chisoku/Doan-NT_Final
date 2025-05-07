import { Sequelize } from "sequelize";
import db from "../models/index.js";

export async function getCartItems(req, res) {
  const { search = "" } = req.query;

  let whereCondition = {};
  if (search) {
    whereCondition = {
      [Sequelize.Op.or]: [
        { id: { [Sequelize.Op.like]: `%${search}%` } },
        { productId: { [Sequelize.Op.like]: `%${search}%` } },
        { userId: { [Sequelize.Op.like]: `%${search}%` } }
      ]
    };
  }

  const cartItems = await db.CartItem.findAll({ 
    where: whereCondition,
    order: [["createdAt", "DESC"]]
  });

  res.status(200).json({
    message: "Lấy danh sách sản phẩm trong giỏ hàng thành công",
    data: cartItems,
  });
}

export async function getCartItemById(req, res) {
  const { id } = req.params;
  const cartItem = await db.CartItem.findByPk(id);

  if (!cartItem) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
  }

  res.status(200).json({
    message: "Lấy thông tin sản phẩm trong giỏ hàng thành công",
    data: cartItem,
  });
}

export async function insertCartItem(req, res) {
  const cartItem = await db.CartItem.create(req.body);

  res.status(201).json({
    message: "Thêm sản phẩm vào giỏ hàng thành công",
    data: cartItem,
  });
}

export async function updateCartItem(req, res) {
  const { id } = req.params;
  const cartItem = await db.CartItem.findByPk(id);

  if (!cartItem) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
  }

  await cartItem.update(req.body);

  res.status(200).json({
    message: "Cập nhật sản phẩm trong giỏ hàng thành công",
    data: cartItem,
  });
}

export async function deleteCartItem(req, res) {
  const { id } = req.params;
  const cartItem = await db.CartItem.findByPk(id);

  if (!cartItem) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
  }

  await cartItem.destroy();

  res.status(200).json({
    message: "Xóa sản phẩm khỏi giỏ hàng thành công",
    data: cartItem,
  });
}
