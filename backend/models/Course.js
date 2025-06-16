const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  price: Number,
  level: String,
  videoURL: String,
  materials: String
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
