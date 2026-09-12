const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
            trim: true,
        },

        content: {
            type: String,
            required: true,
            minlength: 20,
            trim: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Text index for article search
articleSchema.index({
    title: "text",
    content: "text",
});

module.exports = mongoose.model("Article", articleSchema);