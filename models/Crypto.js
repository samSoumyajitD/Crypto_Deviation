const mongoose = require('mongoose');

const CryptoSchema = new mongoose.Schema({

  id: { 
    type: String, 
    required: true, 
    unique: true 
  },// Unique identifier for the cryptocurrency

  symbol: String,// Symbol of the cryptocurrency

  current_price: Number,// Current price of the cryptocurrency

  market_cap: Number,// Market capitalization of the cryptocurrency

  market_cap_rank: Number,// Market capitalization rank of the cryptocurrency

  price_change_24h: Number,// Price change in the last 24 hours

  price_change_percentage_24h: Number,// Price change percentage in the last 24 hours

  market_cap_change_24h: Number,// Market capitalization change in the last 24 hours

  market_cap_change_percentage_24h: Number,// Market capitalization change percentage in the last 24 hours

  last_updated: { 
    type: Date, 
    default: Date.now 
  }// Last updated timestamp

  
});

module.exports = mongoose.model('Crypto', CryptoSchema);
