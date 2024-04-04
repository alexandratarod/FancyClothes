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


dotenv.config();

// Setează calea către directorul principal al proiectului
const rootDir = path.resolve(__dirname, "..");

// Utilizează calea pentru a accesa fișierul .env
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

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend server is running!");
});
