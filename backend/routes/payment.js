const express = require('express');
const router = express.Router();
const razorpay = require('../config/razorpay');
const auth = require('../middleware/authMiddleware');


router.post('/create-order', auth, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || typeof amount !== 'number') {
      console.log("Invalid amount received:", amount);
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    console.error("❌ Razorpay order creation failed:", error);
    res.status(500).json({ message: 'Failed to create Razorpay order', error });
    console.log("KEY:", process.env.RAZORPAY_KEY_ID);

  }
});




module.exports = router;

