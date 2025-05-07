import { Sequelize } from "sequelize";
import db from "../models/index.js";

// API: Tạo thông báo mới
export async function createNotification(req, res) {
    const { user_id, msg, type } = req.body;

    if (!user_id || !msg || !type) {
        return res.status(400).json({ msg: "Thiếu dữ liệu bắt buộc" });
    }

    try {
        const notification = await db.Notification.create({
            user_id,
            msg,
            type,
            created_at: new Date(),
        });

        return res.status(201).json({
            msg: "Tạo thông báo thành công",
            data: notification,
        });
    } catch (error) {
        return res.status(500).json({ msg: "Lỗi khi tạo thông báo", error });
    }
}

// API: Lấy danh sách thông báo của người dùng
export async function getNotifications(req, res) {
    const { user_id } = req.params;
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    try {
        const { count, rows: notifications } = await db.Notification.findAndCountAll({
            where: { user_id },
            limit: pageSize,
            offset,
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            message: "Lấy danh sách thông báo thành công",
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: parseInt(page, 10),
            pageSize,
            data: notifications,
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi lấy danh sách thông báo", error });
    }
}

// API: Đánh dấu thông báo là đã đọc
export async function markNotificationAsRead(req, res) {
    const { id } = req.params;

    try {
        const notification = await db.Notification.findByPk(id);

        if (!notification) {
            return res.status(404).json({ message: "Không tìm thấy thông báo" });
        }

        notification.is_read = true;
        await notification.save();

        return res.status(200).json({
            message: "Đánh dấu thông báo là đã đọc thành công",
            data: notification,
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi đánh dấu thông báo", error });
    }
}

// API: Xóa thông báo
export async function deleteNotification(req, res) {
    const { id } = req.params;

    try {
        const notification = await db.Notification.findByPk(id);

        if (!notification) {
            return res.status(404).json({ message: "Không tìm thấy thông báo" });
        }

        await notification.destroy();

        return res.status(200).json({
            message: "Xóa thông báo thành công",
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi xóa thông báo", error });
    }
}