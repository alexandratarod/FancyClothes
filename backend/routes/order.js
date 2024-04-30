const Order = require("../models/Order");
const Product = require("../models/Product");

const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorizationEntity,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE
//verificata
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET order
//verificata
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all the products of the order
//verificata
router.get("/:id/products", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    console.log(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    let productsDetails = [];
    for (let item of order.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        productsDetails.push(product);
      }
    }
    res.status(200).json(productsDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
//verificata
router.put(
  "/:id",
  verifyTokenAndAuthorizationEntity("Order"),
  async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//DELETE
//verificata
router.delete(
  "/:id",
  verifyTokenAndAuthorizationEntity("Order"),
  async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//GET USER ORDERS -> la fel ca la cart si aici
//verificata
router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
//verificata
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
