const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const auth = require('../middleware/authMiddleware');

// Enroll to course
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    const alreadyEnrolled = await Enrollment.findOne({
      user: req.user.id,
      course: req.params.id
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ msg: 'Already enrolled' });
    }

    const enrollment = new Enrollment({
      user: req.user.id,
      course: req.params.id
    });

    await enrollment.save();
    res.json(enrollment);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get enrolled courses for user
router.get('/my-courses', auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id }).populate('course');
    res.json(enrollments);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
