const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');  


router.post('/', auth, admin, async (req, res) => {
  try {
    const { title, description, category, price, level, videoURL, materials } = req.body;

    const course = new Course({
      title,
      description,
      category,
      price,
      level,
      videoURL,
      materials
    });

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
