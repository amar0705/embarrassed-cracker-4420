const mongoose = require("mongoose");

const NutrientDataSchema = mongoose.Schema({ nutrient: String, value: Number });
const foodSchema = mongoose.Schema({
  id: String,
  userID: String,
  description: String,
  quantity: String,
  unit: String,
  discontinued: Boolean,
  alteredQuantity: Number,
  dynamicQuantity: Number,
  category: String,
  product: String,
  product: String,
  supplier: String,
  nutrient_data: Array,
  characteristics: Array,
  groups: Array,
  units: Array,
});

const FoodModel = mongoose.model("food", foodSchema);

module.exports = { FoodModel };
