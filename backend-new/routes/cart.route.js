const express = require("express");
const { CartModel } = require("../models/cart.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  const userId = req.query.user_id;
  let products = await CartModel.find({ userId: req.query.user_id });
  try {
    let notes;
    if (userId) {
      if (products?.length > 0) notes = await CartModel.find({ userId: userId });
      else notes = [];
    } else {
      notes = await CartModel.find();
    }
    res.send(notes);
  } catch (err) {
    console.log(err);
    console.log({ message: "Something went wrong" });
  }
});

cartRouter.post("/create", async (req, res) => {
  const payload = req.body;
  let notes = await CartModel.find({ userId: payload.userId, productId: payload.productId });
  try {
    if (notes.length > 0) {
      payload.quantity = notes[0].quantity + 1;
      payload.price = payload.price * payload.quantity;
      await CartModel.findByIdAndUpdate({ _id: notes[0]._id }, payload);
    } else {
      const new_note = new CartModel(payload);
      await new_note.save();
    }
    res.send({ message: "Added to Cart" });
  } catch (err) {
    console.log(err);
    res.send({ message: "Something went wrong" });
  }
});

cartRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const note = await CartModel.findOne({ _id: id });
  const userID_in_note = note.userID;
  const userID_in_making = req.body.userID;
  try {
    if (userID_in_making !== userID_in_note) {
      res.send({ message: "You are not authorized" });
    } else {
      await CartModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("Updated the note");
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Something went wrong" });
  }
});

cartRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await CartModel.findByIdAndDelete({ _id: id });
    res.send("Deleted the note");
  } catch (err) {
    console.log(err);
    res.send({ message: "Something went wrong" });
  }
});

cartRouter.post("/delete/all", async (req, res) => {
  const payload = req.body;
  let notes = await CartModel.find({ userId: payload.userId });
  try {
    if (notes?.length > 0) {
      notes?.forEach(async (item) => {
        await CartModel.findByIdAndDelete({ _id: item._id });
      });
    }
    res.send({ message: "Ordered Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ message: "Something went wrong" });
  }
});

module.exports = { cartRouter };
