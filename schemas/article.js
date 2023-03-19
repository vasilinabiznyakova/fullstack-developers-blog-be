const Joi = require("joi");

const addSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  picture: Joi.string(),
  category: Joi.string().required(),
});

module.exports = {
    addSchema,
}