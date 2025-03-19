const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const initializeDatabase = require("./database/initializeDatabase");
const weatherStationsRoute = require("./routes/weatherStationsRoute");
const variablesRoute = require("./routes/variablesRoute");
const weatherDataRoute = require("./routes/weatherDataRoute");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

// configuring auth0
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_SINGING_ALGORITHM,
});

// enforce on all endpoints
app.use(jwtCheck);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      message: "Unauthorized: Invalid token or missing credentials.",
    });
  }
  next(err);
});

// Initialize Database (Create Tables & Insert Default Data)
initializeDatabase();

app.use("/api/weatherStations", weatherStationsRoute);
app.use("/api/variables", variablesRoute);
app.use("/api/weatherData", weatherDataRoute);

module.exports = app;
