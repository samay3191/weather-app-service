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

describe("WeatherStations API", () => {
  test("GET /api/weatherStations should return all stations", async () => {
    const res = await request(app).get("/api/weatherStations");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/weatherStations/:id should return a specific station", async () => {
    const res = await request(app).get("/api/weatherStations/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("ws_name");
    expect(res.body.ws_name).toBe("Cohuna North");
  });

  test("GET /api/weatherStations/:id with invalid ID should return 404", async () => {
    const res = await request(app).get("/api/weatherStations/999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Weather station not found");
  });
});
