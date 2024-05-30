const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: {
      type: String,
      required: true,
      //unique: true,
    },
    description: {
      type: String,
      //required: true,
    },
    img: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
    },
    inCart:
    {
      type:Boolean,
      default: false

    },
    purchased:
    {
      type:Boolean,
      default: false

    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
