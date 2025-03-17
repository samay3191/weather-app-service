const db = require("./db");
const weatherStationsData = require("./data/weatherStationsData.json");

// Create the tables
const createTables = () => {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS WeatherStations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ws_name TEXT NOT NULL,
      site TEXT NOT NULL,
      portfolio TEXT NOT NULL,
      state TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL
    )
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS Variables (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      weather_station_id INTEGER,
      name TEXT NOT NULL,
      long_name TEXT NOT NULL,
      unit TEXT NOT NULL,
      FOREIGN KEY (weather_station_id) REFERENCES WeatherStations(id)
    )
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS WeatherData (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      weather_station_id INTEGER,
      variable_id INTEGER,
      value REAL NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (weather_station_id) REFERENCES WeatherStations(id),
      FOREIGN KEY (variable_id) REFERENCES Variables(id)
    )
  `
  ).run();
};

// Insert provided data into WeatherStations
const insertWeatherStations = () => {
  const insertStatement = db.prepare(
    "INSERT INTO WeatherStations (ws_name, site, portfolio, state, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)"
  );

  weatherStationsData.forEach((station) => {
    insertStatement.run(
      station.ws_name,
      station.site,
      station.portfolio,
      station.state,
      station.latitude,
      station.longitude
    );
  });

  console.log("Weather stations inserted successfully!");
};


// Initialize DB
const initializeDatabase = () => {
  createTables();
  insertWeatherStations();
};

// Export for use in `server.js`
module.exports = initializeDatabase;
