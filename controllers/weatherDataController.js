const WeatherData = require("../models/weatherDataModel");

const getAll = (req, res) => {
  try {
    const weatherData = WeatherData.getAll();
    res.status(200).json(weatherData);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving weatherData" });
  }
};

const getWeatherDataById = (req, res) => {
  const { id } = req.params;
  try {
    const weatherData = WeatherData.getById(id);
    if (!weatherData) {
      res.status(404).send({ message: "WeatherData not found" });
    } else {
      res.status(200).json(weatherData);
    }
  } catch (err) {
    res.status(500).send({ message: "Error retrieving weatherData" });
  }
};

const getWeatherDataByWeatherStationId = (req, res) => {
  const { id } = req.params;
  try {
    const weatherData = WeatherData.getByWeatherStationId(id);
    if (!weatherData) {
      res.status(404).send({ message: "WeatherData not found" });
    } else {
      res.status(200).json(weatherData);
    }
  } catch (err) {
    res.status(500).send({ message: "Error retrieving weatherData" });
  }
};

const getLatestWeatherDataByWeatherStationId = (req, res) => {
  const { id } = req.params;
  try {
    const weatherData = WeatherData.getByWeatherStationIdLatest(id);
    if (!weatherData) {
      res.status(404).send({ message: "WeatherData not found" });
    } else {
      res.status(200).json(weatherData);
    }
  } catch (err) {
    res.status(500).send({ message: "Error retrieving weatherData" });
  }
};

module.exports = {
  getAll,
  getWeatherDataById,
  getWeatherDataByWeatherStationId,
  getLatestWeatherDataByWeatherStationId,
};
