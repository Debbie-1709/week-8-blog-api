const express = require("express");

const {
  home,
  postArticle,
  getAllArticle,
  getArticleById,
  updateArticleById,
  deleteArticleById,
} = require("../controllers/article.controller.js");

const router = express.Router();

// Home route
router.get("/", home);

// Create a new article
router.post("/articles", postArticle);

// Get all articles
router.get("/articles", getAllArticle);

// Get a single article by ID
router.get("/articles/:id", getArticleById);

// Update an article by ID
router.put("/articles/:id", updateArticleById);

// Delete an article by ID
router.delete("/articles/:id", deleteArticleById);

module.exports = router;