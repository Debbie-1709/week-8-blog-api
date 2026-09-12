const ArticleModel = require("../model/article.model.js");

// Home route
const home = (req, res) => {
    res.status(200).send(
        "Hello Dear!<br>Welcome to MY BLOGGER API. <br>Start a blog Today"
    );
};

// Create Article
const postArticle = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        const newArticle = new ArticleModel({
            title,
            content,
            userId: req.user.userId,
        });

        await newArticle.save();

        return res.status(201).json({
            message: "Article created successfully",
            data: newArticle,
        });
    } catch (error) {
        next(error);
    }
};

// Get All Articles
const getAllArticle = async (req, res, next) => {
    try {
        const articles = await ArticleModel.find().populate(
            "userId",
            "name email"
        );

        return res.status(200).json({
            message: "Articles fetched successfully",
            data: articles,
        });
    } catch (error) {
        next(error);
    }
};

// Search Articles
const searchArticles = async (req, res, next) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                message: "Please provide a search keyword",
            });
        }

        const articles = await ArticleModel.find({
            $text: {
                $search: q,
            },
        }).populate("userId", "name email");

        return res.status(200).json({
            message: "Articles searched successfully",
            data: articles,
        });
    } catch (error) {
        next(error);
    }
};

// Get Article By ID
const getArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findById(
            req.params.id
        ).populate("userId", "name email");

        if (!article) {
            return res.status(404).json({
                message: `Article with ID ${req.params.id} not found`,
            });
        }

        return res.status(200).json({
            message: "Article found successfully",
            data: article,
        });
    } catch (error) {
        next(error);
    }
};

// Update Article By ID
const updateArticleById = async (req, res, next) => {
    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedArticle) {
            return res.status(404).json({
                message: `Article with ID ${req.params.id} not found`,
            });
        }

        return res.status(200).json({
            message: "Article updated successfully",
            data: updatedArticle,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Article By ID
const deleteArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findByIdAndDelete(
            req.params.id
        );

        if (!article) {
            return res.status(404).json({
                message: `Article with ID ${req.params.id} not found`,
            });
        }

        return res.status(200).json({
            message: "Article deleted successfully",
            data: article,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    home,
    postArticle,
    getAllArticle,
    searchArticles,
    getArticleById,
    updateArticleById,
    deleteArticleById,
};