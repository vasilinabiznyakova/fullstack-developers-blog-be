const articles = require("../models/articles");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const result = await articles.listArticles();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await articles.getArticleById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addArticle = async (req, res, next) => {
  const result = await articles.addArticle(req.body);
  res.status(201).json(result);
};

const updateArticleById = async (req, res, next) => {
  const { id } = req.params;
  const result = await articles.updateArticle(id, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteArticle = async (req, res, next) => {
  const { id } = req.params;
  const result = await articles.removeArticle(id);
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
