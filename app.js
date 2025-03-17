const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const initializeDatabase = require("./database/initializeDatabase");
const weatherStationsRoute = require("./routes/weatherStationsRoute");
const variablesRoute = require("./routes/variablesRoute");
const weatherDataRoute = require("./routes/weatherDataRoute");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Initialize Database (Create Tables & Insert Default Data)
initializeDatabase();

app.use("/api/weatherStations", weatherStationsRoute);
app.use("/api/variables", variablesRoute);
app.use("/api/weatherData", weatherDataRoute);

module.exports = app;
