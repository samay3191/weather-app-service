const express = require("express");
const router = express.Router();
const weatherStationsController = require("../controllers/weatherStationsController");

router.get("/", weatherStationsController.getWeatherStations);
router.get("/:id", weatherStationsController.getWeatherStationById);

module.exports = router;
