const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    ratting: Number,
    comment: String,
    product_id: String,
    user_id: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentSchema);
