const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  banner: String,
  link: String,
  price: Number,
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
