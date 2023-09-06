const mongoose = require("mongoose");
const shopcartSchema = new mongoose.Schema({
  product_id: String,
  matter: Number,
  amount: Number,
  total_price: Number,
  colors: String,
});

module.exports = mongoose.model("shopcarts", shopcartSchema);
