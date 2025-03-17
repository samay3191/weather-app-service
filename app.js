const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const initializeDatabase = require('./database/initializeDatabase');
const weatherStationsRoute = require('./routes/weatherStationsRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Initialize Database (Create Tables & Insert Default Data)
initializeDatabase();

app.use('/api/weatherStations', weatherStationsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
