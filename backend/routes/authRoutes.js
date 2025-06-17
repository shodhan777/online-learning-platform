const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware');


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: 'User already exists' });

  user = new User({ name, email, password: await bcrypt.hash(password, 10) });
  await user.save();

  const token = jwt.sign({ id: user._id }, 'your_secret_key');
  res.json({ token });
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, 'your_secret_key');
  res.json({ token });
});


router.get('/profile', auth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
