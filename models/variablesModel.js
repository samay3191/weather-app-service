const db = require("../database/db");

const Variables = {
  getAll: () => {
    return db.prepare("SELECT * FROM Variables").all();
  },
  getById: (id) => {
    return db.prepare('SELECT * FROM Variables WHERE id = ?').get(id);
  },
  getByWeatherStationId: (id) => {
    return db.prepare('SELECT * FROM Variables WHERE weather_station_id = ?').all(id);
  }
};

module.exports = Variables;
