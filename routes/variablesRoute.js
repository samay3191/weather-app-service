const express = require("express");
const router = express.Router();
const variablesController = require("../controllers/variablesController");

// Get all variables
router.get("/", variablesController.getVariables);
// Get variables by weather station ID
router.get("/weather-station/:id", variablesController.getVariableByWeatherStationId);
// Get a specific variable by its ID
router.get("/:id", variablesController.getVariableById);

module.exports = router;
