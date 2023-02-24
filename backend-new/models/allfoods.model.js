const mongoose = require("mongoose");

const allfoodSchema = mongoose.Schema({
  id: String,
  description: String,
  quantity: String,
  unit: String,
  category: String,
  product: String,
  product: String,
  supplier: String,
  nutrient_data: Array,
  characteristics: Array,
  groups: Array,
  units: Array,
  discontinued: Boolean,
  alteredQuantity: Number,
  dynamicQuantity: Number,
});

const AllFoodModel = mongoose.model("allfood", allfoodSchema);

module.exports = { AllFoodModel };
