const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


require("dotenv").config();

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const enrollRoutes = require('./routes/enroll');
app.use('/api/enroll', enrollRoutes);

app.use('/api/admin/courses', require('./routes/adminCourses'));

const progressRoutes = require('./routes/progress');
app.use('/api/progress', progressRoutes);

app.use('/api/progress', require('./routes/progress'));

const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);
