const express = require('express');

const { getAllCryptos, getCryptoStats } = require('../controllers/cryptoController'); // Import the controller functions
const { getAllHistoricalData,getHistoricalData } = require('../controllers/cryptoHisController'); // Import the controller functions
const {  calculateDeviation} = require('../jobs/deviation'); // Import the calculateDeviation function

const router = express.Router();// Create a new router

// Route to fetch all cryptocurrency data
router.get('/', getAllCryptos);

// Route to fetch stats of a specific cryptocurrency
router.get('/stats', getCryptoStats); // Define the /stats endpoint

// Route to fetch all historical data
router.get('/fetch-historical', getAllHistoricalData);

// Route to get historical data for a specific cryptocurrency
router.get('/historical100', getHistoricalData);

// Route to calculate deviation
router.get('/deviation', calculateDeviation);

module.exports = router;
