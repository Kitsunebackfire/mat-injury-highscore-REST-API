const request = require("supertest");
const assert = require("assert");
const express = require("express");
const userRouter = require("../../routes/user.routes");
const User = require("../../models/user.model");
const {
  connectDB,
  dropDB,
  dropCollections,
} = require("../../utilities/mongoConfigTesting");

beforeAll(async () => {
  await connectDB();
});
afterAll(async () => {
  await dropDB();
});
afterEach(async () => {
  await dropCollections();
});

describe("POST /users/register", () => {
  describe("given a username, password, and email", () => {
    test("should save username, password, and email to db", async () => {
      const body = {
        username: "test",
        email: "test@gmail.com",
        password: "testpassword",
      };
      const newUser = await User(body);
      await newUser.save();
      console.log(newUser);
      expect(newUser._id).toBeDefined();
    });
    test("should encrypt password with bcrypt", async () => {
      const body = {
        username: "test",
        email: "test@gmail.com",
        password: "testpassword",
      };
      const newUser = await User(body);
      await newUser.save();
      console.log(newUser);
      expect(newUser.password).not.toBe(body.password);
    });

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
    test("should respond with 400 status code when provided incomplete info", async () => {
      request(userRouter)
        .post("/register")
        .send({
          username: "tester",
          email: "test@gmail.com",
        })
        .expect(400);
    });

    test("should specify json in the content type header", async () => {
      request(userRouter)
        .post("/register")
        .send({
          username: "tester",
          password: "passwordtest",
          email: "test@gmail.com",
        })
        .expect("Content-Type", /json/)
        .expect(201);
    });
  });
  //describe("when username and password is missing", () => {});
});
