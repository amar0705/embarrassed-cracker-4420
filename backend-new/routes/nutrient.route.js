const express = require("express");
const { NutrientModel } = require("../models/nutrient.model");

const nutrientRouter = express.Router();

nutrientRouter.get("/", async (req, res) => {
  try {
    const nutrients = await NutrientModel.find();
    res.send(nutrients);
  } catch (err) {
    console.log(err);
    console.log({ message: "Something went wrong", error: err.message });
  }
});

module.exports = { nutrientRouter };
