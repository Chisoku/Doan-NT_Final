import Joi from "joi";
// import bcrypt from "bcrypt";

class InsertUserRequest {
    constructor(data) {
        this.email = data.email;
        this.password = data.password; // Không mã hóa trong constructor
        this.name = data.name;
        this.role = data.role ?? 2; // Mặc định là User thường
        this.avatar = data.avatar ?? "";
        this.phone = data.phone;
        this.address = data.address ?? "";
    }

    static validate(data) {
        const schema = Joi.object({
            email: Joi.string().email().max(255).required(),
            password: Joi.string().min(6).max(255).required(),
            name: Joi.string().min(3).max(255).required(),
            role: Joi.number().integer().valid(1, 2).default(2), // 1 = Admin, 2 = User thường
            avatar: Joi.string().allow("").optional(),
            phone: Joi.string().pattern(/^[0-9]{10,11}$/).required(),
            address: Joi.string().allow("").optional(),
        });

        return schema.validate(data, { abortEarly: false });
    }
}

export default InsertUserRequest;
