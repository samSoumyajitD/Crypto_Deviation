const axios = require('axios');
const Crypto = require('../models/Crypto'); // Assuming the model is in the models folder

// Function to fetch data and store it in the database
const fetchAndSaveCryptoData = async () => {
  try {
    // List of coins to fetch
    const coins = ['bitcoin', 'ethereum', 'polygon-ecosystem-token'];
    // Fetch the data from the CoinGecko API
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',// Convert the prices to USD
        ids: coins.join(','),// Fetch data for the specified coins
        x_cg_demo_api_key: process.env.API_KEY// Use the API key as a query parameter
      }
    });

    // Iterate over the response data
    response.data.forEach(async (coin) => {
      // Extract the required fields
      const { id, symbol, current_price, market_cap, market_cap_rank, price_change_24h, price_change_percentage_24h, market_cap_change_24h, market_cap_change_percentage_24h, last_updated } = coin;

      // Save the data in the database
      await Crypto.findOneAndUpdate(
        { 'id': id }, // Find the coin by 'id'
        {
          'symbol': symbol,
          'current_price': current_price,
          'market_cap': market_cap,
          'market_cap_rank': market_cap_rank,
          'price_change_24h': price_change_24h,
          'price_change_percentage_24h': price_change_percentage_24h,
          'market_cap_change_24h': market_cap_change_24h,
          'market_cap_change_percentage_24h': market_cap_change_percentage_24h,
          'last_updated': new Date(last_updated),
        },
        { 
          upsert: true 
        } // If not found, insert a new record
      );
    });

    console.log('Data fetched and saved to the database');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

module.exports = { fetchAndSaveCryptoData };
