const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/authMiddleware');

// Create review
router.post('/:courseId', auth, async (req, res) => {
  const review = new Review({
    user: req.user._id,
    course: req.params.courseId,
    rating: req.body.rating,
    comment: req.body.comment
  });
  await review.save();
  res.json(review);
});

// Get reviews
router.get('/:courseId', async (req, res) => {
  const reviews = await Review.find({ course: req.params.courseId }).populate('user', 'name');
  res.json(reviews);
});

module.exports = router;
