require("dotenv").config();
const express = require("express");
const app = express();

// routes
const authRouter = require("../routes/auth.routes");
const injuryRouter = require("../routes/injury.routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/posts", injuryRouter);

module.exports = app;
