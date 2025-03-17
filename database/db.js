const Database = require("better-sqlite3");
const db = new Database(process.env.TEST_DB ? ":memory:" : "weather.db", { verbose: console.log });

module.exports = db;
