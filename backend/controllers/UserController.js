import { Sequelize } from "sequelize";
import db from "../models/index.js";
import InsertUserRequest from "../dtos/requests/user/InsertUserRequest.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // thêm dòng này
import dotenv from "dotenv";
dotenv.config(); // nạp biến môi trường

const SALT_ROUNDS = 10;

export async function getUsers(req, res) {
  const { search = "", page = 1 } = req.query;
  const pageSize = 6;
  const offset = (page - 1) * pageSize;

  let whereCondition = {};
  if (search) {
    whereCondition = {
      name: { [db.Sequelize.Op.like]: `%${search}%` },
    };
  }

  const { count, rows: users } = await db.User.findAndCountAll({
    where: whereCondition,
    limit: pageSize,
    offset,
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["password"] },
  });

  res.status(200).json({
    message: "Lấy danh sách người dùng thành công",
    totalItems: count,
    totalPages: Math.ceil(count / pageSize),
    currentPage: parseInt(page, 10),
    pageSize,
    data: users,
  });
}

export async function getUserById(req, res) {

  console.log(req.userId);
  const { id } = req.params;
  const user = await db.User.findByPk(id, { attributes: { exclude: ["password"] } });

  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  }
  res.status(200).json({
    message: "Lấy thông tin người dùng thành công",
    data: user,
  });
}
// Kiểm tra xem userId có tồn tại không
export async function insertUser(req, res) {
      // Validate dữ liệu đầu vào
    const { error, value } = InsertUserRequest.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ", errors: error.details });
    }

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await db.User.findOne({ where: { email: value.email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(value.password, SALT_ROUNDS);

    // Lưu vào database
    const user = await db.User.create({ ...value, password: hashedPassword });

    res.status(201).json({
      message: "Thêm mới người dùng thành công",
      data: user,
  });
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await db.User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  }

  await user.destroy();
  res.status(200).json({
    message: "Xóa người dùng thành công",
    data: user,
  });
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { email, ...updateData } = req.body; // Loại bỏ email khỏi dữ liệu cập nhật

  // Kiểm tra user có tồn tại không
  const user = await db.User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  }

  // Cập nhật user (không cập nhật email)
  await user.update(updateData);

  res.status(200).json({
    message: "Cập nhật thông tin người dùng thành công",
    data: user,
  });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  // Kiểm tra người dùng
  const user = await db.User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
  }

  // Tạo token
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role || "user" // nếu có role
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  // Trả về token + user (ẩn mật khẩu)
  const { password: _, ...userData } = user.toJSON();

  res.status(200).json({
    message: "Đăng nhập thành công",
    accessToken: token,
    data: userData
  });
}