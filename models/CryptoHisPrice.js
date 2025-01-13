const mongoose = require('mongoose');

// Create Schema for storing Bitcoin price data
const bitcoinPriceSchema = new mongoose.Schema({

  // Unique identifier for the cryptocurrency
  id: {
    type: String,
    required: true,
    default: 'bitcoin'
  },

  // Historical price data for the cryptocurrency
  prices: {
    type: [[Number]],
    required: true,
  },
  
  // Last updated timestamp
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create Model
const BitcoinPrice = mongoose.model('BitcoinPrice', bitcoinPriceSchema);

module.exports = BitcoinPrice;
