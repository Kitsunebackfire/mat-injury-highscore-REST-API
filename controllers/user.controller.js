const { body } = require("express-validator");
const jwt = require("jsonwebtoken");

const userErrorHandler = require("../utilities/error_handler").userErrorHandler;

exports.register__post = [
  body("username").trim().escape().isLength({ min: 3 }),
  body("email").isEmail().normalizeEmail(),
  body("password").trim().escape(),
  async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    user.save((err) => {
      if (err) {
        //console.log(err);
        const errors = userErrorHandler(err);
        res.status(400).json({ status: "error", errors });
      } else {
        res
          .status(201)
          .json({ status: "ok", message: "successful creation", user });
      }
    });
  },
];

/* exports.register__post = [
  body("username").trim().escape().isLength({ min: 3 }),
  body("email").isEmail().normalizeEmail(),
  body("password").trim().escape(),
  async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    user.save((err) => {
      if (err) {
        //console.log(err);
        const errors = userErrorHandler(err);
        res.status(400).json({ status: "error", errors });
      } else {
        res.status(201).json({ status: "ok", message: "successful creation" });
      }
    });
  },
]; */
