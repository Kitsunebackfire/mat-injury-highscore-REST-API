const request = require("supertest");
const app = require("../appTest");
const User = require("../../models/user.model");
const {
  connect,
  cleanData,
  disconnect,
} = require("../testUtils/mongoConfigTesting");

beforeAll(async () => await connect());
beforeEach(async () => await cleanData());
afterAll(async () => await disconnect());
describe("User", () => {
  describe("POST /api/users", () => {
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
        .post("/api/users/register")
        .send({
          username: "test",
          email: "test@gmail.com",
          password: "password123",
        })
        .expect("Content-Type", /json/)
        .expect({ status: "ok", message: "successful creation" })
        .expect(201, done);
    });
    test("should NOT save INVALID user to db", function (done) {
      request(app)
        .post("/api/users/register")
        .send({
          username: "test",
          email: "tetgmail.com",
          password: "password123",
        })
        .expect("Content-Type", /json/)
        .expect(422, done);
    });
  });
});
