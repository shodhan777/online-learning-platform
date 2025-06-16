const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// Save Progress
router.post('/:courseId', auth, async (req, res) => {
  const { progress } = req.body;
  const { courseId } = req.params;

  try {
    const user = await User.findById(req.user.id);

    const existingProgress = user.courseProgress.find(p => p.course.toString() === courseId);

    if (existingProgress) {
      existingProgress.progress = progress;
    } else {
      user.courseProgress.push({ course: courseId, progress });
    }

    await user.save();

    res.json({ msg: 'Progress saved' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get Progress
router.get('/:courseId', auth, async (req, res) => {
  const { courseId } = req.params;
  try {
    const user = await User.findById(req.user.id);
    const progressObj = user.courseProgress.find(p => p.course.toString() === courseId);
    res.json({ progress: progressObj ? progressObj.progress : 0 });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
