const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path"); // Adaugă modulul 'path'

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const reviewRoute = require("./routes/review");
const stripeRoute = require("./routes/stripe");

const cors = require("cors");

app.use(cors());

dotenv.config();

const rootDir = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(rootDir, ".env") });

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Db connection successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/orders", orderRoute);
app.use("/reviews", reviewRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend server is running!");
});
