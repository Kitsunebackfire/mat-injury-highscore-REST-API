const request = require("supertest");
const assert = require("assert");
const express = require("express");
const userRouter = require("../routes/user.routes");
const app = express();
describe("POST /users/register", () => {
  describe("given a username, password, and email", () => {
    // should save username, password, and email to db
    // should respond with json object containing user id
    test("should respond with 201 status code", async () => {
      request(userRouter)
        .post("/register")
        .send({
          username: "tester",
          password: "passwordtest",
          email: "test@gmail.com",
        })
        .expect(201);
    });
    // should specify json in the content type header
  });
  //describe("when username and password is missing", () => {});
});