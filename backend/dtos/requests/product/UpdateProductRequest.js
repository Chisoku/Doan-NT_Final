import Joi from "joi";

class UpdateProductRequest {
    constructor(data) {
        this.name = data.name;
        this.image = data.image ?? ""; // Mặc định chuỗi rỗng nếu không có
        this.price = data.price;
        this.description = data.description ?? ""; // Mặc định chuỗi rỗng nếu không có
        this.buyturn = data.buyturn ?? 0; // Đảm bảo luôn có giá trị mặc định
        this.category_id = data.category_id;
    }

    static validate(data) {
        const schema = Joi.object({
            name: Joi.string().min(3).max(255).required(),
            image: Joi.string().allow("").optional(),
            price: Joi.number().min(0).required(),
            description: Joi.string().optional(),
            buyturn: Joi.number().integer().min(0).default(0),
            category_id: Joi.number().integer().required(),
        });

        return schema.validate(data, { abortEarly: false }); // Trả về tất cả lỗi nếu có
    }
}

export default UpdateProductRequest;
