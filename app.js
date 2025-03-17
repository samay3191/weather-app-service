const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/stations", (req, res) => {
    const stations = db.prepare("SELECT * FROM WeatherStations").all();
    res.json(stations);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
