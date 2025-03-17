const request = require("supertest");
const app = require("../app"); // Import your Express app
const db = require("../database/db"); // Import database connection
let server;

beforeAll(() => {
  process.env.TEST_DB = "true"; // Use in-memory DB for testing
});

afterAll(() => {
  db.close(); // Close DB connection after tests
  if (server) server.close(done);
});

describe("Weather Data API", () => {
  test("GET /api/weatherData should return all weatherData", async () => {
    const res = await request(app).get("/api/weatherData");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/weatherData/:id should return a specific weatherData", async () => {
    const res = await request(app).get("/api/weatherData/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("timestamp");
    expect(res.body.timestamp).toBe("2023-08-29 06:00:00");
    expect(res.body).toHaveProperty("value");
    expect(res.body.value).toBe(17.09);
  });

  test("GET /api/weatherData/:id with invalid ID should return 404", async () => {
    const res = await request(app).get("/api/weatherData/999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("WeatherData not found");
  });

  test("GET /api/weatherData/weather-station/:id should return all weatherData for given station id", async () => {
    const res = await request(app).get("/api/weatherData/weather-station/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(24);
    expect(res.body[0]).toHaveProperty("timestamp");
    expect(res.body[0].timestamp).toBe("2023-08-29 06:00:00");
    expect(res.body[0]).toHaveProperty("value");
    expect(res.body[0].value).toBe(17.09);
  });

  test("GET /api/weatherData/weather-station/:id with invalid station ID should return empty array", async () => {
    const res = await request(app).get("/api/weatherData/weather-station/999");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(0);
  });

  test("GET /api/weatherData/latest/weather-station/:id should return only latest weatherData for given station id", async () => {
    const res = await request(app).get("/api/weatherData/latest/weather-station/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty("timestamp");
    expect(res.body[0].timestamp).toBe("2023-08-29 06:55:00");
    expect(res.body[0]).toHaveProperty("value");
    expect(res.body[0].value).toBe(17.54);
  });
});
