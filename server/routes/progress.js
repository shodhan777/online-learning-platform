const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware.js');
const Progress = require('../models/Progress');

// Get progress
router.get('/:courseId', auth, async (req, res) => {
  const { courseId } = req.params;
  const { id: userId } = req.user;

  const prog = await Progress.findOne({ user: userId, course: courseId });
  res.json(prog || { completedLessons: [] });
});

// Mark a lesson complete
router.post('/:courseId/complete', auth, async (req, res) => {
  const { courseId } = req.params;
  const { lessonId } = req.body; // frontend will send this
  const userId = req.user.id;

  let prog = await Progress.findOne({ user: userId, course: courseId });
  if (!prog) {
    prog = await Progress.create({ user: userId, course: courseId, completedLessons: [] });
  }
  if (!prog.completedLessons.includes(lessonId)) {
    prog.completedLessons.push(lessonId);
    await prog.save();
  }
  res.json(prog);
});

module.exports = router;
