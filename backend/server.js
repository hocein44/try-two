require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes'); // Import Routes


const app = express();
app.use(cors());
app.use(express.json());
connectDB();
// ✅ Use Product Routes
app.use('/products', productRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));