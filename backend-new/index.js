const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { productRouter } = require("./routes/product.route");
const { cartRouter } = require("./routes/cart.route");
const { nutrientRouter } = require("./routes/nutrient.route");
const { foodRouter } = require("./routes/foods.route");
const { allfoodRouter } = require("./routes/allfood.route");
const { adminRouter } = require("./routes/admin.routes");
require("dotenv").config();

const { authenticate } = require("./middlewares/authenticate.middleware");
const cors = require("cors");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Homepage");
});

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "DELETE"],

  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOpts));
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use(authenticate);
app.use("/admin", adminRouter);
app.use("/nutrients", nutrientRouter);
app.use("/foods", foodRouter);
app.use("/allfoods", allfoodRouter);
app.use("/cart", cartRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the Database");
  } catch (err) {
    console.log("Trouble connecting to the Database");
    console.log(err);
  }
  console.log(`Listening to port ${process.env.port}`);
});
