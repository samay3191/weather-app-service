const express = require("express");
const router = express.Router();
const weatherDataController = require("../controllers/weatherDataController");

// Get all weather data
router.get("/", weatherDataController.getAll);
// Get latest weather data by station ID
router.get(
  "/latest/weather-station/:id",
  weatherDataController.getLatestWeatherDataByWeatherStationId
);
// Get all weather data by station ID
router.get(
  "/weather-station/:id",
  weatherDataController.getWeatherDataByWeatherStationId
);
// Get a specific weather data by its ID
router.get("/:id", weatherDataController.getWeatherDataById);

module.exports = router;
