require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./db');
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const indexRouter = require('./routes/index');
app.use('/api', indexRouter);

const authRoutes = require('./routes/authRoutes'); // Adjust path if needed
app.use('/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
