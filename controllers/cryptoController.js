const Crypto = require('../models/Crypto'); // Import the Crypto model

// Controller to fetch all cryptocurrency data
const getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find(); // Fetch all cryptocurrencies
    res.status(200).json(cryptos); // Send the data as JSON
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    res.status(500).json({ message: 'Error fetching cryptocurrencies' });
  }
};

// Controller to fetch stats of a specific cryptocurrency
const getCryptoStats = async (req, res) => {
  const { coin } = req.query; // Get the 'coin' query parameter

// Check if the 'coin' query parameter is provided
  if (!coin) {
    return res.status(400).json({ message: 'Coin query parameter is required' });
  }

  // Fetch the cryptocurrency data
  try {
    const crypto = await Crypto.findOne({ id: coin }); // Find the coin by its 'id'
    
    // Check if the cryptocurrency exists
    if (!crypto) {
      return res.status(404).json({ message: `Cryptocurrency with id ${coin} not found` });
    }

    res.status(200).json(crypto); // Send the data of the specific cryptocurrency
  } catch (error) {
    console.error('Error fetching cryptocurrency stats:', error);
    res.status(500).json({ message: 'Error fetching cryptocurrency stats' });
  }
};

module.exports = {
  getAllCryptos,
  getCryptoStats, 
};
