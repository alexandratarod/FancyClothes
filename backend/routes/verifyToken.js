const Product = require("../models/Product");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Review = require("../models/Review");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAuthorizationEntity = (tableName) => {
  return async (req, res, next) => {
    await verifyToken(req, res, async () => {
      try {
        let entity;
        if (tableName === "Product") {
          entity = await Product.findById(req.params.id);
        } else if (tableName === "Order") {
          entity = await Order.findById(req.params.id);
        } else if (tableName === "Cart") {
          entity = await Cart.findById(req.params.id);
        } else if (tableName === "Review") {
          entity = await Review.findById(req.params.id);
        }

        if (!entity) {
          return res.status(404).json(`${tableName} not found!`);
        }

        if (req.user.id === entity.userId.toString() || req.user.isAdmin) {
          next();
        } else {
          res.status(403).json("You are not allowed to do that!");
        }
      } catch (err) {
        res.status(500).json({ message: "Server error", err });
      }
    });
  };
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAuthorizationEntity,
  verifyTokenAndAdmin,
};
