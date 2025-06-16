const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// All courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Get course by ID
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
});

// Create course (admin only)
router.post('/', auth, admin, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json(course);
});

module.exports = router;
