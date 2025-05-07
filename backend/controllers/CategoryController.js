import { Sequelize } from "sequelize";
import db from "../models/index.js";

export async function getCategories(req, res) {
  const { search = "", page = 1 } = req.query;
  const pageSize = 10; // Số danh mục mỗi trang
  const offset = (page - 1) * pageSize;

  // Điều kiện tìm kiếm (nếu có)
  let whereCondition = {};
  if (search) {
    whereCondition = {
      name: { [db.Sequelize.Op.like]: `%${search}%` }, // Tìm theo tên chứa `search`
    };
  }

  // Truy vấn CSDL với phân trang & tìm kiếm
  const { count, rows: categories } = await db.Category.findAndCountAll({
    where: whereCondition,
    limit: pageSize,
    offset,
    order: [["createdAt", "DESC"]], // Sắp xếp theo thời gian tạo mới nhất
  });

  res.status(200).json({
    message: "Lấy danh sách danh mục thành công",
    totalItems: count,
    totalPages: Math.ceil(count / pageSize),
    currentPage: parseInt(page, 10),
    pageSize,
    data: categories,
  });
}


export async function getCategoryById(req, res) {
  const { id } = req.params;
  const category = await db.Category.findByPk(id);

  if (!category) {
    return res.status(404).json({ message: "Không tìm thấy danh mục" });
  }

  res.status(200).json({
    message: "Lấy thông tin danh mục thành công",
    data: category,
  });
}

export async function insertCategory(req, res) {
    try {
      // Tạo danh mục mới từ dữ liệu req.body
      const category = await db.Category.create(req.body);
  
      res.status(201).json({
        message: "Thêm mới danh mục thành công",
        data: category
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi khi thêm danh mục",
        error: error.message
      });
    }
  }
  

  export async function deleteCategory(req, res) {
    const { id } = req.params;
    const category = await db.Category.findByPk(id);
  
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
  
    // Xóa danh mục
    await category.destroy();
    res.status(200).json({
      message: "Xóa danh mục thành công",
      data: category,
    });
  }
  
  export async function updateCategory(req, res) {
    const { id } = req.params;
    const updateData = req.body;
  
    // Kiểm tra danh mục có tồn tại không
    const category = await db.Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
  
    // Cập nhật danh mục
    await category.update(updateData);
  
    res.status(200).json({
      message: "Cập nhật danh mục thành công",
      data: category,
    });
  }
  