
const Product = require("../models/Product");

const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorizationEntity,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE
//verificata
router.post("/add-product", verifyToken, async (req, res) => {
  const newProduct = new Product({
    ...req.body,
    userId: req.user.id,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
//verificata
router.put(
  "/:id",
  verifyTokenAndAuthorizationEntity("Product"),
  async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//DELETE
//verificata
router.delete(
  "/:id",
  //verifyToken,
  async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//GET PRODUCT
//verificata
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
//verificata
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER'S PRODUCTS
router.get("/my-products/:id", verifyToken, async (req, res) => {
  const userId = req.params.id;
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if (qNew) {
      products = await Product.find({ userId: userId })
        .sort({ createdAt: -1 })
        .limit(1);
    } else if (qCategory) {
      products = await Product.find({
        userId: userId,
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find({ userId: userId });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put("/:id/inCart", async (req, res) => {
  try {
    const productId = req.params.id;
    const { inCart } = req.body;

    
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Produsul nu a fost găsit." });
    }

    
    product.inCart = inCart;

   
    await product.save();

    res.status(200).json({ message: "Starea inCart a produsului a fost actualizată cu succes." });
  } catch (error) {
    console.error("Eroare la actualizarea stării inCart a produsului:", error);
    res.status(500).json({ message: "Eroare la actualizarea stării inCart a produsului." });
  }
});

router.put("/purchase/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = req.body.cartItems;

    await Promise.all(
      cartItems.map(async (item) => {
        await Product.findByIdAndUpdate(
          item.productId,
          { $set: { purchased: true } },
          { new: true }
        );
      })
    );

    res.status(200).json({ message: "Products updated to purchased" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/purchased-products/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const purchasedProducts = await Product.find({ userId: userId, purchased: true });
    res.status(200).json(purchasedProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
