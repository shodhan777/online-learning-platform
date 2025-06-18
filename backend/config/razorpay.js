// config/razorpay.js
const Razorpay = require("razorpay");
require('dotenv').config(); // Make sure this is called once at top level

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpay;
