const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");
// const { nanoid } = require("nanoid");

const articlesPath = path.join(__dirname, "articles.json");

console.log(articlesPath);

const listArticles = async () => {
  const result = await fs.readFile(articlesPath);
  return JSON.parse(result);
};

const getArticleById = async (id) => {
  const articles = await listArticles();
  const result = articles.find((item) => item.id === id);
  return result || null;
};

const addArticle = async ({ title, description, picture, category }) => {

  const articles = await listArticles();

  const newArticle = {
    id: nanoid(),
    title,
    description,
    picture,
    category,
    date: new Date(),
  };

  articles.push(newArticle);

  await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));

  return newArticle;
};

const updateArticle = async (id, data) => {

  const articles = await listArticles();

  const index = articles.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
   articles[index] = { id, ...data };
   await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
   return articles[index];
};


const removeArticle = async (id) => {

  const articles = await listArticles();
  
  const index = articles.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [result] = articles.splice(index, 1);
  await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
  return result;
};






module.exports = {
  listArticles,
  getArticleById,
  removeArticle,
  addArticle,
  updateArticle,
};
