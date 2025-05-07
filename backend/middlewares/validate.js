const validate = (requestType) => {
    return (req, res, next) => {
        const { error } = requestType.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: "Dữ liệu không hợp lệ",
                errors: error.details[0].message
            });
        }
        next(); // Nếu không có lỗi, tiếp tục request
    };
};
export default validate;