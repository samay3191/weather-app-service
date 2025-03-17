const db = require("./db");
const weatherStationsData = require("./data/weatherStationsData.json");
const variablesData = require("./data/variablesData.json");
const weatherData = require("./data/weatherData.json");

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
  // Check if the table is empty
  const rowCount = db
    .prepare("SELECT COUNT(*) AS count FROM WeatherStations")
    .get();

  if (rowCount.count === 0) {
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
  }
};

// Insert provided data into Variables
const insertVariables = () => {
  // Check if the table is empty
  const rowCount = db.prepare("SELECT COUNT(*) AS count FROM Variables").get();

  if (rowCount.count === 0) {
    const insertStatement = db.prepare(
      "INSERT INTO Variables (id, weather_station_id, name, long_name, unit) VALUES (?, ?, ?, ?, ?)"
    );

    variablesData.forEach((variable) => {
      insertStatement.run(
        variable.id,
        variable.weather_station_id,
        variable.name,
        variable.long_name,
        variable.unit
      );
    });

    console.log("Variables inserted successfully!");
  }
};

// Insert provided data into Weather Data
const insertWeatherData = () => {
  // Check if the table is empty
  const rowCount = db.prepare("SELECT COUNT(*) AS count FROM WeatherData").get();

  if (rowCount.count === 0) {
    const insertStatement = db.prepare(
      "INSERT INTO WeatherData (weather_station_id, variable_id, value, timestamp) VALUES (?, ?, ?, ?)"
    );

    weatherData.forEach((reading) => {
      insertStatement.run(
        reading.weather_station_id,
        reading.variable_id,
        reading.value,
        reading.timestamp
      );
    });

    console.log("Weather Data inserted successfully!");
  }
};

// Initialize DB
const initializeDatabase = () => {
  createTables();
  insertWeatherStations();
  insertVariables();
  insertWeatherData();
};

// Export for use in `app.js`
module.exports = initializeDatabase;
