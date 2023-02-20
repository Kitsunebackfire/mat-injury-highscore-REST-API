require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 3001;

// mongodb
mongoose.set("strictQuery", true);
const mongoDB = process.env.DB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//routes
const indexRouter = require("./routes/index.routes.js");
const userRouter = require("./routes/user.routes");

app.use("/api", indexRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
