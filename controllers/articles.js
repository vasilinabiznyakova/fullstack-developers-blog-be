const { Article } = require("../models/article");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const result = await Article.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Article.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addArticle = async (req, res, next) => {
  const articleInfo = req.body;
  const result = await Article.create(articleInfo);
  res.status(201).json(result);
};

const updateArticleById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Article.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteArticle = async (req, res, next) => {
  const { id } = req.params;
  const result = await Article.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "Delete success" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addArticle: ctrlWrapper(addArticle),
  updateArticleById: ctrlWrapper(updateArticleById),
  deleteArticle: ctrlWrapper(deleteArticle),
};
