const express = require("express");
const { FoodModel } = require("../models/food.model");

const foodRouter = express.Router();

foodRouter.get("/", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    let foods = [];
    let foodsPresent = await FoodModel.find({ userID: user_id });
    if (user_id) {
      if (foodsPresent?.length > 0) foods = await FoodModel.find({ userID: user_id });
    } else {
      foods = await FoodModel.find();
    }
    res.send(foods);
  } catch (err) {
    console.log(err);
    console.log({ message: "Something went wrong", error: err.message });
  }
});

foodRouter.post("/add", async (req, res) => {
  const payload = req.body;
  const foodsArray = await FoodModel.find({ userID: payload.userID, id: payload.id });
  let userFoodsArray = [];
  try {
    if (foodsArray.length === 1) {
      let foodItem = foodsArray[0];
      foodItem.quantity = Number(payload.quantity);
      foodItem.alteredQuantity = Number(foodItem.alteredQuantity) + Number(payload.quantity);
      foodItem.dynamicQuantity = Number(foodItem.alteredQuantity) / Number(payload.quantity);
      foodItem.nutrient_data.forEach((item) => {
        item.altered_value = Number(item.value) * foodItem.dynamicQuantity.toFixed(2);
      });
      await FoodModel.findByIdAndUpdate({ _id: foodItem._id }, foodItem);
      userFoodsArray = await FoodModel.find({ userID: payload.userID });
      res.send({
        message: "Updated food quantity in diary",
        data: userFoodsArray,
      });
    } else {
      payload.quantity = Number(payload.quantity);
      payload.alteredQuantity = Number(payload.quantity);
      payload.dynamicQuantity = 1;
      payload.nutrient_data.forEach((item) => {
        item.altered_value = (Number(item.value) * payload.dynamicQuantity).toFixed(2);
      });
      const food = new FoodModel(payload);
      await food.save();
      userFoodsArray = await FoodModel.find({ userID: payload.userID });
      res.send({
        message: "Added new food in diary",
        data: userFoodsArray,
      });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Something went wrong" });
  }
});

foodRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await FoodModel.findByIdAndDelete({ _id: ID });
    res.send({ message: "Deleted" });
  } catch (err) {
    res.send({ message: "Something went wrong", error: err.message });
  }
});

foodRouter.delete("/delete", async (req, res) => {
  const userID = req.query.user_id;
  try {
    if (userID) {
      await FoodModel.deleteMany({ userID: userID });
    }
    res.send({ message: "Deleted" });
  } catch (err) {
    res.send({ message: "Something went wrong", error: err.message });
  }
});

module.exports = { foodRouter };
