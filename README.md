# Cryptocurrency Data Aggregation Service

This project is a cryptocurrency data aggregation service that fetches and stores cryptocurrency data from the CoinGecko API, including real-time prices and historical data. It includes a REST API to access this data, and scheduled tasks to keep the data up-to-date.

## Features

- Fetch and store real-time cryptocurrency data, including:
  - Current price
  - Market capitalization
  - Price changes over 24 hours
- Fetch and store historical price data for the last 100 days.
- Calculate standard deviation of historical prices.
- Provide REST API endpoints to retrieve real-time and historical data.
- Automatically update data at scheduled intervals using cron jobs.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API Integration**: CoinGecko API
- **Task Scheduler**: Cron
- **Environment Management**: dotenv

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-uri>
   API_KEY=<your-coingecko-api-key>
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000` by default.

## Project Structure

```
.
├── config/
│   └── db.js                     # Database connection setup
├── controllers/
│   ├── cryptoController.js       # Handles real-time cryptocurrency data
│   ├── cryptoHisController.js    # Handles historical cryptocurrency data
│   └── deviation.js              # Calculates standard deviation
├── models/
│   ├── Crypto.js                 # MongoDB schema for real-time data
│   ├── CryptoHisPrice.js         # MongoDB schema for historical data
├── routes/
│   └── cryptoRoutes.js           # API routes for cryptocurrencies
├── services/
│   ├── cryptoService.js          # Service for fetching real-time data
│   ├── cryptoHisService.js       # Service for fetching historical data
├── .env                          # Environment variables
├── package.json                  # Project dependencies and scripts
└── server.js                     # Main server file
```

## API Endpoints

### Real-Time Data
- **GET `/`**: Fetch all cryptocurrency data.
- **GET `/stats`**: Fetch stats for a specific cryptocurrency by query parameter `coin`.

### Historical Data
- **GET `/fetch-historical`**: Fetch all historical data.
- **GET `/historical100`**: Fetch historical data for a specific cryptocurrency by query parameter `coin`.
- **GET `/deviation`**: Calculate and fetch the standard deviation of the last 100 prices for a specific cryptocurrency by query parameter `coin`.

## Scheduled Tasks

- **Fetch and Save Real-Time Data**: Runs every 2 hours.
- **Fetch and Save Historical Data**: Runs daily for predefined coins (`bitcoin`, `ethereum`, `polygon-ecosystem-token`).

## Running the Project

### Local Development
1. Ensure MongoDB is running locally or provide a connection URI in `.env`.
2. Start the server:
   ```bash
   npm start
   ```

### Production
1. Deploy the project to your preferred platform (e.g., AWS, Heroku, etc.).
2. Set environment variables in your deployment environment.
3. Use a process manager like PM2 for better reliability:
   ```bash
   npm install pm2 -g
   pm2 start server.js
   ```

## Notes

- Ensure you have a valid API key from CoinGecko to use their API.
- The project supports dynamic addition of coins for historical data fetching.

## Future Enhancements

- Add more analytics capabilities (e.g., moving averages, volatility).
- Integrate WebSocket for real-time price updates.
- Add user authentication for personalized watchlists.

## License

This project is licensed under the MIT License.
```