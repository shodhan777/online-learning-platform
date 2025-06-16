const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  rating: Number,
  comment: String
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
