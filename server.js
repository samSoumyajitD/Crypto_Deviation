const express = require('express');
const cron = require('cron');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Database connection
const { fetchAndSaveCryptoData } = require('./services/cryptoService'); // Crypto data service
const { fetchCryptoHistoricalData } = require('./services/cryptoHisService'); // Historical data service

dotenv.config(); // Load environment variables

const port = process.env.PORT || 5000;// Set the port

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Schedule task to fetch and save cryptocurrency data every 2 hours
const fetchCryptoJob = new cron.CronJob('0 */2 * * *', fetchAndSaveCryptoData);
fetchCryptoJob.start();

// Initial fetch to populate the database
fetchAndSaveCryptoData();


// Fetch historical data for predefined coins and set up a daily schedule
const coins = ['bitcoin', 'ethereum', 'polygon-ecosystem-token'];
coins.forEach((coinId) => {
  // Initial fetch for historical data
  fetchCryptoHistoricalData(coinId);

  // Schedule daily fetch for historical data (24 hours = 86400000 ms)
  setInterval(() => fetchCryptoHistoricalData(coinId), 86400000);
});


// API routes
app.use('/', require('./routes/cryptoRoutes')); // Use the new routes file


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
