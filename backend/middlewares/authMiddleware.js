// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Kiểm tra có header không
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc thiếu token!' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.userId = decoded.id; // Lưu thông tin user nếu cần dùng ở controller
        next(); // Cho phép đi tiếp
    } catch (error) {
        return res.status(403).json({ message: 'Token hết hạn hoặc không hợp lệ!' });
    }
};

module.exports = authMiddleware;
