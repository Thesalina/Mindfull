const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const resourceRoute = require('./routes/resourceRoute'); // ✅ Correct if resourceRoute.js is in same folder

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/mindfull', {
 
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/resources', resourceRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
