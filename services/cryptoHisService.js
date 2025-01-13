const axios = require('axios');
const BitcoinPrice = require('../models/CryptoHisPrice');// Import the Crypto model

// Function to fetch historical price data for a specific cryptocurrency
const fetchCryptoHistoricalData = async (coinId) => {
  try {
    // Fetch the historical price data from the CoinGecko API
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      {
        params: {
          
          days: 100,// Fetch the last 100 days of data
          vs_currency: 'usd',// Convert the prices to USD
          x_cg_demo_api_key: process.env.API_KEY,// Use the API key as a query parameter

        },
      }
    );

    // Extract the price data from the response
    const prices = response.data.prices;

    // Save or update the historical price data in MongoDB
    await BitcoinPrice.findOneAndUpdate(
      { 
        id: coinId // Find the document by the coin ID
      },
      { 
        prices, lastUpdated: new Date() // Update the prices and lastUpdated fields
      },
      { 
        upsert: true, new: true // Create a new document if it doesn't exist
      }
    );
  } catch (error) {
    console.error(`Error fetching historical data for ${coinId}:`, error);
  }
};

exports.fetchCryptoHistoricalData = fetchCryptoHistoricalData;