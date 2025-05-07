import { Sequelize } from "sequelize";
import db from "../models/index.js";
import { SHOWINDEXES } from "sequelize/lib/query-types";


export async function getOrders(req, res) {
  const { search = "" } = req.query;

  let whereCondition = {};
  if (search) {
    whereCondition = {
      [Sequelize.Op.or]: [
        { id: { [Sequelize.Op.like]: `%${search}%` } },
        { name: { [Sequelize.Op.like]: `%${search}%` } },
        { email: { [Sequelize.Op.like]: `%${search}%` } },
        { phone: { [Sequelize.Op.like]: `%${search}%` } }
      ]
    };
  }

  const orders = await db.Order.findAll({ 
    where: whereCondition,
    order: [["createdAt", "DESC"]]
  });

  res.status(200).json({
    message: "Lấy danh sách đơn hàng thành công",
    data: orders,
  });
}

// orderController.js
// orderController.js
export const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "Thiếu userId trong yêu cầu" });
  }

  try {
    const orders = await db.Order.findAll({
      where: { user_id: userId }
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng cho người dùng này' });
    }

    return res.status(200).json({
      message: 'Lấy danh sách đơn hàng thành công',
      data: orders,
    });
  } catch (err) {
    console.error("Lỗi khi lấy đơn hàng:", err);
    return res.status(500).json({
      message: 'Không thể lấy dữ liệu đơn hàng',
      error: err.message
    });
  }
};



export async function getOrderById(req, res) {
  const { id } = req.params;

  try {
    const orderItems = await db.OrderItem.findAll({
      where: {
        order_id: id
      },
      include: [
        {
          model: db.Product,
          as: 'Product', // cần đúng alias trong model
          attributes: ['name', 'price', 'image'] // chọn các field cần lấy
        }
      ]
    });

    if (!orderItems || orderItems.length === 0) {
      return res.status(404).json({ 
        message: "Không tìm thấy đơn hàng", });
    }

    res.status(200).json({
      message: "Lấy thông tin đơn hàng thành công",
      data: orderItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
}




export async function insertOrder(req, res) {
  const userId = req.userId;

  try {
    // Kiểm tra nếu đã có đơn hàng 'pending' thì không cho tạo mới
    const existingPendingOrder = await db.Order.findOne({
      where: {
        user_id: userId,
        status: "pending"
      }
    });

    if (existingPendingOrder) {
      return res.status(201).json({
        message: "Đã có đơn hàng đang chờ xử lý",
        data: existingPendingOrder,
      });
    }

    // Nếu không có đơn pending thì tạo đơn mới
    const order = await db.Order.create({
      user_id: userId,
      status: "pending",
      content: "",
      payment_type: "",
      total_price: 0,
      shipping_address: "",
    });

    return res.status(201).json({
      message: "Thêm mới đơn hàng thành công",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi khi thêm đơn hàng", error });
  }
}


export async function updateOrder(req, res) {
  const { id } = req.params;
  const { payment_type, shipping_address, total_price, content, status } = req.body;

  try {
    const order = await db.Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    // Cập nhật thông tin đơn hàng nếu có
    const updatedData = {
      ...(payment_type && { payment_type }),
      ...(shipping_address && { shipping_address }),
      ...(total_price !== undefined && { total_price }),
      ...(content && { content }),
      ...(status && { status }), // nếu có status thì cũng cập nhật
    };

    if (Object.keys(updatedData).length > 0) {
      // Cập nhật thông tin đơn hàng
      await order.update(updatedData);
    }

    // Chuyển trạng thái từ 'pending' thành 'paid' nếu trạng thái là 'pending'
    if (order.status === 'pending') {
      await order.update({
        status: 'paid',
        paymentDate: new Date(), // lưu thời gian thanh toán
      });
    }

    res.status(200).json({
      message: "Cập nhật đơn hàng thành công",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi khi cập nhật đơn hàng", error });
  }
}


export async function deleteOrder(req, res) {
  const { id } = req.params;
  const order = await db.Order.findByPk(id);

  if (!order) {
    return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
  }

  await order.destroy();

  res.status(200).json({
    message: "Xóa đơn hàng thành công",
    data: order,
  });
}
