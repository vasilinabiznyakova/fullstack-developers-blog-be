const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const categoryList = ["websites development", "personal"];

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: String,
    category: {
      type: String,
      enum: categoryList,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

articleSchema.post("save", handleMongooseError);

const Joi = require("joi");

const addSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  picture: Joi.string(),
  category: Joi.string()
    .valid(...categoryList)
    .required(),
  // date: Joi.string().required(),
});

const schemas = {
  addSchema,
};

const Article = model("article", articleSchema);

module.exports = { Article, schemas };
