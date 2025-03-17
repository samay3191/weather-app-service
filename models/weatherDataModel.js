const db = require("../database/db");

const WeatherData = {
  getAll: () => {
    return db.prepare("SELECT * FROM WeatherData").all();
  },
  getById: (id) => {
    return db.prepare("SELECT * FROM WeatherData WHERE id = ?").get(id);
  },
  getByWeatherStationId: (station_id) => {
    return db
      .prepare("SELECT * FROM WeatherData WHERE weather_station_id = ?")
      .all(station_id);
  },
  getByWeatherStationIdLatest: (station_id) => {
    return db
      .prepare(
        `
      SELECT wd.*, v.name, v.long_name, v.unit
      FROM WeatherData wd
      INNER JOIN Variables v ON wd.variable_id = v.id
        AND wd.weather_station_id = v.weather_station_id
      WHERE wd.weather_station_id = ?
      AND timestamp = (
        SELECT MAX(timestamp) 
        FROM WeatherData 
        WHERE weather_station_id = ?
      )
    `
      )
      .all(station_id, station_id);
  },
};

module.exports = WeatherData;
