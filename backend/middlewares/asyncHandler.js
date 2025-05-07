const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next); // Gọi hàm fn truyền vào với tham số req, res, next
        } catch (error) {
            return res.status(500).json({
                message: 'Internal Server Error he',
                error: process.env.NODE_ENV === 'development' ? error : ''
            });
            
        }
    };
};

export default asyncHandler;
