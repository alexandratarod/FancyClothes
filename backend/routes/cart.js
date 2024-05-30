const Cart = require("../models/Cart");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAuthorizationEntity,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE
//verificata
router.post("/", verifyToken, async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [{ productId }] });
    } else {
      const existingProduct = cart.products.find(item => item.productId === productId);
      
      if (existingProduct) {
        return res.status(400).json({ message: "Product already exists in the cart" });
      } else {
        cart.products.push({ productId });
      }
    }

    const savedCart = await cart.save();

    console.log(savedCart);
    res.status(200).json(savedCart);
  } catch (err) {
    console.error("Error adding product to cart:", err);
    res.status(500).json(err);
  }
});


//UPDATE
//verificata
router.put(
  "/:id",
  verifyTokenAndAuthorizationEntity("Cart"),
  async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//DELETE
//verificata
// router.delete(
//   "/:id",
  
//   async (req, res) => {
//     try {
//       await Cart.findByIdAndDelete(req.params.id);
//       res.status(200).json("Cart has been deleted...");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// );

router.delete(
  "/:userId/:productId",
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;

      const cart = await Cart.findOneAndUpdate(
        { userId: userId },
        { $pull: { products: { productId: productId } } },
        { new: true }
      );

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      res.status(200).json({ message: "Product has been deleted from cart", cart: cart });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.delete(
  "/:userId",
  async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log(userId);
      const cart = await Cart.findOneAndDelete({ userId: userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      res.status(200).json({ message: "Cart has been deleted", cart: cart });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

//GET USER CART -> de vazut aici cu autentificarea
//verificata
router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
//verificata
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
