import Joi from "joi";

class UpdateUserRequest {
    constructor(data) {
        this.name = data.name; // Giữ nguyên name
        this.phone = data.phone ?? ""; 
        this.address = data.address ?? ""; 
        this.avatar = data.avatar ?? ""; 
    }

    static validate(data) {
        const schema = Joi.object({
            name: Joi.string().min(3).max(50),
            phone: Joi.string().pattern(/^\d{10,15}$/).optional(),
            address: Joi.string().optional(),
            avatar: Joi.string().uri().optional(),
        });

        return schema.validate(data, { abortEarly: false });
    }
}

export default UpdateUserRequest;
