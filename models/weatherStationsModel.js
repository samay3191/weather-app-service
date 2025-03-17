const db = require("../database/db");

const WeatherStation = {
  getAll: () => {
    return db.prepare("SELECT * FROM WeatherStations").all();
  },
  getById: (id) => {
    return db.prepare('SELECT * FROM WeatherStations WHERE id = ?').get(id);
  },
};

module.exports = WeatherStation;
