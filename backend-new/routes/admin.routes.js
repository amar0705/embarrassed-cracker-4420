const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminRouter = express.Router();

adminRouter.get("/", async (req, res) => {
  let query = req.query.user_type;
  try {
    let alldata;
    if (query) {
      alldata = await UserModel.find({ userType: query });
    } else {
      alldata = await UserModel.find();
    }
    res.send(alldata);
  } catch (err) {
    res.send({ message: "Something went wrong", error: err.message });
  }
});

adminRouter.post("/add", async (req, res) => {
  const { email, pass, name, age, userType } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel(
          userType
            ? { email, pass: secure_password, name, age, userType }
            : { email, pass: secure_password, name, age, userType: "user" }
        );
        await user.save();
        res.send({ message: "Registered" });
      }
    });
  } catch (err) {
    res.send("Error in registering the user");
    console.log(err);
  }
});

adminRouter.patch("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    await UserModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send({ message: "Updated" });
  } catch (err) {
    res.send({ message: "Soemthing went wrong", error: err.message });
  }
});

adminRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await UserModel.findByIdAndDelete({ _id: ID });
    res.send({ message: "Deleted" });
  } catch (err) {
    res.send({ message: "Something went wrong", error: err.message });
  }
});

module.exports = { adminRouter };
