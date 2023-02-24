const mongoose = require("mongoose");

const nutrientSchema = mongoose.Schema({
  id: String,
  description: String,
  unit: String,
  unitId: String,
  target: Number,
});

const NutrientModel = mongoose.model("nutrient", nutrientSchema);

module.exports = { NutrientModel };
