const BitcoinPrice = require('../models/CryptoHisPrice');

// Controller to fetch all cryptocurrency data
const getAllHistoricalData = async (req, res) => {
    try {
        // Fetch all cryptocurrencies
        const historicalData = await BitcoinPrice.find();
        res.status(200).json(historicalData);
    } catch (error) {
        console.error('Error fetching historical data:', error);
        res.status(500).json({ error: 'Error fetching historical data' });
    }
};

// Controller to fetch stats of a specific cryptocurrency
const getHistoricalData = async (req, res) => {
    // Get the 'coin' query parameter
    const { coin } = req.query;

    // Check if the 'coin' query parameter is provided
    if (!coin) {
      return res.status(400).json({ message: 'Coin query parameter is required' });
    }
    try {

        // Fetch the cryptocurrency data
        const historicalData = await BitcoinPrice.findOne({ id: coin });
        // Check if the cryptocurrency exists
        if (!historicalData) {
            return res.status(404).json({ message: `Historical data for ${coin} not found` });
        }
        // Send the data of the specific cryptocurrency
        res.status(200).json(historicalData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
        res.status(500).json({ error: `Error fetching historical data for ${coin}` });

    }
};



module.exports = {  getAllHistoricalData , getHistoricalData};
