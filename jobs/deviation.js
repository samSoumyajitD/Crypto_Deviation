const BitcoinPrice = require('../models/CryptoHisPrice'); 

// Function to calculate standard deviation
const calculateDeviation = async (req, res) => {

  // Get the 'coin' query parameter
  const { coin } = req.query;

// Check if the 'coin' query parameter is provided
  if (!coin) {
    return res.status(400).json({ message: 'Query parameter "coin" is required' });
  }

  try {
    // Fetch the latest 100 records for the coin
    const coinData = await BitcoinPrice.findOne({ id: coin });

// Check if the coin data is available
    if (!coinData || !coinData.prices || coinData.prices.length === 0) {
      return res.status(404).json({ message: `No price data found for coin: ${coin}` });
    }

    // Get the last 100 prices
    const prices = coinData.prices.slice(-100).map((entry) => entry[1]); // Assuming entry[1] is the price

    // Check if there are enough prices
    if (prices.length === 0) {
      return res.status(404).json({ message: `Insufficient data for coin: ${coin}` });
    }

    // Calculate the mean
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    // Calculate the variance
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;

    // Calculate the standard deviation
    const standardDeviation = Math.sqrt(variance);

    // Return the standard deviation
    res.status(200).json({ deviation: parseFloat(standardDeviation.toFixed(2)) });
  } catch (error) {
    console.error('Error calculating deviation:', error);
    res.status(500).json({ error: 'Failed to calculate standard deviation' });
  }
};

module.exports = { calculateDeviation };
