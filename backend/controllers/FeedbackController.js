import { Sequelize } from "sequelize";
import db from "../models/index.js";

// API: Người dùng đánh giá sản phẩm
export async function createFeedback(req, res) {
    const { user_id, product_id, star, content } = req.body;

    if (!user_id || !product_id || !star) {
        return res.status(400).json({ message: "Thiếu dữ liệu bắt buộc" });
    }

    try {
        const feedback = await db.Feedback.create({
            user_id,
            product_id,
            star,
            content,
            created_at: new Date(),
        });

        return res.status(201).json({
            message: "Đánh giá sản phẩm thành công",
            data: feedback,
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi tạo đánh giá", error });
    }
}

// API: Lấy đánh giá của sản phẩm
export async function getFeedbacksByProductId(req, res) {
    const { product_id } = req.params;
    const { page = 1, pageSize = 6 } = req.query;
    const offset = (page - 1) * pageSize;

    try {
        const { count, rows: feedbacks } = await db.Feedback.findAndCountAll({
            where: { product_id },
            limit: pageSize,
            offset,
            order: [["created_at", "DESC"]],
            include: [{ model: db.User, attributes: ["id", "name"] }], // Gộp thông tin người đánh giá
        });

        return res.status(200).json({
            message: "Lấy danh sách đánh giá thành công",
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: parseInt(page, 10),
            pageSize,
            data: feedbacks,
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi lấy danh sách đánh giá", error });
    }
}