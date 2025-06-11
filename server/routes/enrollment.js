const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const authMiddleware = require('../middleware/authMiddleware.js'); // JWT middleware

// Enroll in a course
router.post('/:courseId/enroll', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const courseId = req.params.courseId;

    if (!user || !courseId) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    // Check if already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
