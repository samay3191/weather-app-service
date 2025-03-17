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

describe("Variables API", () => {
  test("GET /api/variables should return all variables", async () => {
    const res = await request(app).get("/api/variables");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/variables/:id should return a specific variable", async () => {
    const res = await request(app).get("/api/variables/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body.name).toBe("AirT_inst");
  });

  test("GET /api/variables/:id with invalid ID should return 404", async () => {
    const res = await request(app).get("/api/variables/999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Variable not found");
  });

  test("GET /api/variables/weather-station/:id should return all variables for given station id", async () => {
    const res = await request(app).get("/api/variables/weather-station/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0].name).toBe("AirT_inst");
    expect(res.body[1]).toHaveProperty("name");
    expect(res.body[1].name).toBe("GHI_inst");
  });

  test("GET /api/variables/weather-station/:id with invalid station ID should return 404", async () => {
    const res = await request(app).get("/api/variables/weather-station/999");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(0);
  });
});
