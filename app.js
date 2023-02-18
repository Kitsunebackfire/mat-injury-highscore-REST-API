require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

//routes
const indexRouter = require("./routes/index.routes.js");
const userRouter = require("./routes/user.routes");

app.use("/api", indexRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("server up");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
