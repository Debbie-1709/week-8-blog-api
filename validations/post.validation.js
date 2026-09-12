const Joi = require("joi");

const createArticleSchema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    content: Joi.string().min(20).required(),
});

const validateArticle = (req, res, next) => {
    const { error } = createArticleSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message,
        });
    }

    next();
};

const updateArticleSchema = Joi.object({
    title: Joi.string().min(5).max(50).optional(),
    content: Joi.string().min(20).optional(),
});

const validateUpdateArticle = (req, res, next) => {
    const { error } = updateArticleSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message,
        });
    }

    next();
};

module.exports = {
    validateArticle,
    validateUpdateArticle,
};