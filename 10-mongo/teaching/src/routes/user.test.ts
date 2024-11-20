import { test, expect, beforeAll, afterAll, afterEach } from "vitest";
import { app } from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  const collections = await mongoose.connection.db!.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

test("it should return an empty array to begin with", async () => {
  const response = await request(app).get("/api/v1/users");
  expect(response.status).toBe(200);
  expect(response.body).toEqual([]);
});

test("should create a new user", async () => {
  const newUser = { name: "Alice", location: "Wonderland" };

  const response = await request(app)
    .post("/api/v1/users")
    .set("x-api-key", "supersecretcode") // Assuming apiKeyAuth checks this
    .send(newUser);

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject(newUser);
  // expect(response.body).toHaveProperty("id");

  const response2 = await request(app).get("/api/v1/users");

  expect(response2.body.length).toEqual(1);
});
