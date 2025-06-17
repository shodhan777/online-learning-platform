const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User'); // ✅ You forgot to import this
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

    const user = await User.findById(req.user.id);
    user.enrolledCourses.push(req.params.id);
    await user.save();

    return res.json(enrollment); // ✅ Send response after everything is done
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
});

router.get('/mycourses', auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id }).populate('course');
    const user = await User.findById(req.user.id);

    const response = enrollments.map(enroll => {
      const courseProgress = user.courseProgress.find(p => p.course.toString() === enroll.course._id.toString());
      const progress = courseProgress ? courseProgress.progress : 0;

      return {
        _id: enroll._id,
        course: enroll.course,
        progress
      };
    });

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
module.exports = router;