const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, default: 0 },
  level: String,
  videoURL: String,
  materials: [String],
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
