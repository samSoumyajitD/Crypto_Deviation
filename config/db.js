const mongoose = require('mongoose');

// Load env variables
const connectDB = () => {

  // Connect to MongoDB
  mongoose.connect(process.env.MONGO)
  
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

};

module.exports = connectDB;
