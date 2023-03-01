require("dotenv").config();
const express = require("express");
const app = express();
require("./utilities/mongoConfig");
const port = process.env.PORT || 3001;

// middlewares
app.use(express.json());

// mongodb
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const mongoDB = process.env.DB_URI;
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("mongodb connected")
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//routes
const injuryRouter = require("./routes/injury.routes.js");
const authRouter = require("./routes/auth.routes");

app.use("/api", injuryRouter);
app.use("/api/auth", authRouter);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
