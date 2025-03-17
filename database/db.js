const Database = require("better-sqlite3");
const db = new Database("weather.db", { verbose: console.log });

module.exports = db;
