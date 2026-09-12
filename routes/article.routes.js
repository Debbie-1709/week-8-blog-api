const express = require("express");

const {
    home,
    postArticle,
    getAllArticle,
    searchArticles,
    getArticleById,
    updateArticleById,
    deleteArticleById,
} = require("../controllers/article.controller.js");

const {
    requireAuth,
    requireOwnership,
} = require("../require.auth.js");

const ArticleModel = require("../model/article.model.js");

const {
    validateArticle,
    validateUpdateArticle,
} = require("../validations/post.validation.js");

const router = express.Router();

// Home route
router.get("/", home);

// Create article
router.post(
    "/articles",
    requireAuth,
    validateArticle,
    postArticle
);

// Get all articles
router.get(
    "/articles",
    requireAuth,
    getAllArticle
);

// Search articles
router.get(
    "/articles/search",
    requireAuth,
    searchArticles
);

// Get article by ID
router.get(
    "/articles/:id",
    requireAuth,
    getArticleById
);

// Update article
router.put(
    "/articles/:id",
    requireAuth,
    requireOwnership(ArticleModel),
    validateUpdateArticle,
    updateArticleById
);

// Delete article
router.delete(
    "/articles/:id",
    requireAuth,
    requireOwnership(ArticleModel),
    deleteArticleById
);

module.exports = router;