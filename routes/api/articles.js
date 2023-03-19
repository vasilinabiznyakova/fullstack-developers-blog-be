const express = require("express");


const ctrl = require("../../controllers/articles");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/article");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addArticle);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateArticleById);

router.delete("/:id", ctrl.deleteArticle);

module.exports = router;
