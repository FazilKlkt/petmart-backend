// necessary imports
require('dotenv').config();
const petRouter = require('./routes/petRoute');
const userRouter = require('./routes/userRoutes');
const { connectDB } = require('./config/db');
const express = require('express');
const cors = require('cors');

// express app settings
const app = express()
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// databse connection and  routers
connectDB();
app.use('/pet', petRouter);
app.use('/user', userRouter);

// listening at port 5000
app.listen(process.env.HOST, () => console.log("Connected on port:" + process.env.HOST));
