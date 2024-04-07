const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
