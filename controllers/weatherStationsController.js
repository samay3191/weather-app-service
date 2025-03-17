const WeatherStation = require("../models/weatherStationsModel");

const getWeatherStations = (req, res) => {
  try {
    const stations = WeatherStation.getAll();
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving weather stations" });
  }
};

const getWeatherStationById = (req, res) => {
  const { id } = req.params;
  try {
    const station = WeatherStation.getById(id);
    if (!station) {
      res.status(404).send({ message: "Weather station not found" });
    } else {
      res.status(200).json(station);
    }
  } catch (err) {
    res.status(500).send({ message: "Error retrieving weather station" });
  }
};

module.exports = { getWeatherStations, getWeatherStationById };
