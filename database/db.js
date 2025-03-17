const Database = require("better-sqlite3");
const db = new Database("weather.db", { verbose: console.log });
const weatherStationsData = require("./data/weatherStationsData.json");

// Create tables
const createTables = () => {
  db.exec(`
        CREATE TABLE IF NOT EXISTS WeatherStations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ws_name TEXT NOT NULL,
            site TEXT NOT NULL,
            portfolio TEXT NOT NULL,
            state TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL
        );
    `);
};
createTables();

// Insert default data if the table is empty
const checkData = db
  .prepare("SELECT COUNT(*) AS count FROM WeatherStations")
  .get();
if (checkData.count === 0) {
  const insertStmt = db.prepare(
    "INSERT INTO WeatherStations (ws_name, site, portfolio, state, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)"
  );
  weatherStationsData.map((ws) => {
    insertStmt.run(
      ws.ws_name,
      ws.site,
      ws.portfolio,
      ws.state,
      ws.latitude,
      ws.longitude
    );
  });
  console.log("Default weather stations added.");
}

module.exports = db;
