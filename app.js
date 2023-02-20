require("dotenv").config();
const express = require("express");
const app = express();
require("./utilities/mongoConfig");
const port = process.env.PORT || 3001;

// mongodb

//routes
const indexRouter = require("./routes/index.routes.js");
const userRouter = require("./routes/user.routes");

app.use("/api", indexRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
