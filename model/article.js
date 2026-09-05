const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },

    content: {
      type: String,
      required: true,
      minlength: 20,
    },

    author: {
      type: String,
      default: "Guest",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", articleSchema);