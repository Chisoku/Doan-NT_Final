import Joi from "joi";

class InsertProductRequest {
  constructor(data) {
    this.name = data.name;
    this.image = data.image || null;
    this.price = data.price;
    this.description = data.description;
    this.buyturn = data.buyturn;
    this.category_id = data.category_id;
  }

  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(255).required(),
      image: Joi.string().allow(null).optional(),
      price: Joi.number().min(0).required(),
      description: Joi.string().allow("").optional(),
      buyturn: Joi.number().integer().min(0).default(0),
      category_id: Joi.number().integer().required(),
    });

    return schema.validate(data);
  }
}

export default InsertProductRequest;
