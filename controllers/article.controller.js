const Joi = require("joi");
const ArticleModel = require("../model/article.js");

// Home route
const home = (req, res) => {
  res.status(200).send(
    "Hello Dear!<br>Welcome to MY BLOGGER API. <br>Start a blog Today"
  );
};

// Create Article
const postArticle = async (req, res, next) => {
  const articleSchema = Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(20).required(),
    author: Joi.string().optional(),
  });

  const { error, value } = articleSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Please provide a valid article title and content",
      error: error.details[0].message,
    });
  }

  try {
    const { title, content, author } = value;

    const newArticle = new ArticleModel({
      title,
      content,
      author: author || "Guest",
    })

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
    const articles = await ArticleModel.find({});

    return res.status(200).json({
      message: "Articles fetched successfully",
      data: articles,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// Get Article By ID
const getArticleById = async (req, res, next) => {
  try {
    const article = await ArticleModel.findById(req.params.id);

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
    console.error(error);
    next(error);
  }
};

// Update Article By ID
const updateArticleById = async (req, res, next) => {
  const articleSchema = Joi.object({
    title: Joi.string().min(5).optional(),
    content: Joi.string().min(20).optional(),
    author: Joi.string().optional(),
  });

  const { error, value } = articleSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Please provide valid article details",
      error: error.details[0].message,
    });
  }

  try {
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      value,
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
    console.error(error);
    next(error);
  }
};

// Delete Article By ID
const deleteArticleById = async (req, res, next) => {
  try {
    const article = await ArticleModel.findByIdAndDelete(req.params.id);

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
    console.error(error);
    next(error);
  }
};

// Export all functions
module.exports = {
  home,
  postArticle,
  getAllArticle,
  getArticleById,
  updateArticleById,
  deleteArticleById,
};