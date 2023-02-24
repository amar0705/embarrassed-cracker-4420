const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  productId: String,
  userId: String,
  title: String,
  description: String,
  banner: String,
  link: String,
  price: Number,
  quantity: Number,
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel };
