const express = require("express");
const { AllFoodModel } = require("../models/allfoods.model");

const allfoodRouter = express.Router();

allfoodRouter.get("/", async (req, res) => {
  try {
    const foods = await AllFoodModel.find();
    res.send(foods);
  } catch (err) {
    console.log(err);
    console.log({ message: "Something went wrong", error: err.message });
  }
});

module.exports = { allfoodRouter };
