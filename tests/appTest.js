require("dotenv").config();

const connect = require("./testUtils/mongoConfigTesting").connect;

const express = require("express");

const app = express();
const userRouter = require("../routes/user.routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/users", userRouter);

module.exports = app;
