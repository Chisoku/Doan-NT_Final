import { Sequelize } from "sequelize";
import db from "../models/index.js";
import InsertProductRequest from "../dtos/requests/product/InsertProductRequest.js"

export async function getProducts(req, res) {
  try {
    const { search = "", page = 1, category_id } = req.query; // Thêm category_id từ query
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    // Điều kiện tìm kiếm
    let whereCondition = {};
    if (search) {
      whereCondition.name = { [db.Sequelize.Op.like]: `%${search}%` };
    }
    if (category_id) {
      whereCondition.category_id = category_id;
    }

    const { count, rows: products } = await db.Product.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset,
      order: [["buyturn", "DESC"]],
    });

    res.status(200).json({
      message: "Lấy danh sách sản phẩm thành công",
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page, 10),
      pageSize,
      data: products,
    });
  } catch (error) {
    console.error("Lỗi getProducts:", error);
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
}

//API dang ki, 

export async function getProductById(req, res) {
  const {id} = req.params
  const product = await db.Product.findByPk(id);

  if (!product) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
  res.status(200).json({
    message: "Lấy thông tin sản phẩm thành công",
    data: product
  })
}

export async function insertProduct(req, res) {
  
  const { name, price, description, buyturn, category_id } = req.body;
  
  // Lấy đường dẫn ảnh đã upload 
  const image = req.file ? req.file.path : null;  // Nếu có file ảnh, lấy đường dẫn

  console.log("image:", image);
  console.log("name:", name);
  console.log("price:", price);
  console.log("description:", description);
  console.log("buyturn:", buyturn);
  console.log("category_id:", category_id);


  //Thêm sản phẩm vào database
  const product = await db.Product.create({
    name,
    image,
    price,
    description,
    buyturn,
    category_id,
  });

  // Trả về kết quả thành công
  res.status(201).json({
    message: "Thêm mới sản phẩm thành công",
    // data: product,
  });
}


export async function deleteProduct(req, res) {
  const { id } = req.params;
  const product = await db.Product.findByPk(id);
  if (!product) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }

  // Xóa sản phẩm
  await product.destroy();
  res.status(200).json({
    message: "Xóa sản phẩm thành công",
    data: product
  });
}


export async function updateProduct(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  // Kiểm tra sản phẩm có tồn tại không
  const product = await db.Product.findByPk(id);
  if (!product) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }

  // Cập nhật sản phẩm
  await product.update(updateData);

  res.status(200).json({
    message: "Cập nhật sản phẩm thành công",
    data: product,
  });
}
