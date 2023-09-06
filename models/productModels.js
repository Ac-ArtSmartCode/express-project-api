const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  prod_name: String,
  prod_price: Number,
  prod_desc: String,
  stock: Number,
  prod_image: String,
  create_by: { first_name: String, last_name: String, image: String },
  colors: String,
  img_url: String,
});

module.exports = mongoose.model("products", productSchema);
