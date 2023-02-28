const request = require("supertest");
const app = require("../appTest");
const User = require("../../models/user.model");
const {
  connect,
  cleanData,
  disconnect,
} = require("../testUtils/mongoConfigTesting");
const bcrypt = require("bcrypt");

beforeAll(async () => await connect());
//beforeEach(async () => await cleanData());
afterAll(async () => await disconnect());

describe("User", () => {
  describe("POST /api/auth/register", () => {
    test("controller should be able to create a new user and encrypt password", async () => {
      const body = {
        username: "test",
        email: "test@gmail.com",
        password: "password123",
      };
      const newUser = await User(body);
      await newUser.save();
      expect(newUser.password).not.toEqual(body.password);
    });
    test("should save user to db", function (done) {
      request(app)
        .post("/api/auth/register")
        .send({
          username: "test",
          email: "test2@gmail.com",
          password: "password123",
        })
        .expect("Content-Type", /json/)
        .expect({ status: "ok", message: "successful creation" })
        .expect(201, done);
    });
    test("should NOT save INVALID format user to db", function (done) {
      request(app)
        .post("/api/auth/register")
        .send({
          username: "test",
          email: "tetgmail.com",
          password: "password123",
        })
        .expect("Content-Type", /json/)
        .expect(422, done);
    });
  });
  describe("POST /api/auth/login", () => {
    test("should login and recieve status of 200 with proper login credentials", function (done) {
      // previous registration established the login info needed

      request(app)
        .post("/api/auth/login")
        .send({ email: "test2@gmail.com", password: "password123" })
        .expect("Content-Type", /json/)
        //.expect({ status: "ok", message: "successful creation" })
        .expect(200, done);
    });
    test("should receive login error due to invalid login credentials", function (done) {
      // previous registration established the login info needed
      request(app)
        .post("/api/auth/login")
        .send({ email: "test@gmail.com", password: "2password123" })
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
  });
});
