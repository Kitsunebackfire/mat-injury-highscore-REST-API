const { body, validationResult } = require("express-validator");
const Injury = require("../models/injury.model");
/* exports.injuriesRecent__get = async (req, res) => {

} */

exports.injuries__post = [
  body("username").trim().escape().isLength({ min: 3 }),
  body("email").trim().isEmail().escape(),
  body("password").trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.mapped() });
      return;
    }
    const { injury } = req.body;
    const user = req.user._id;
    const newinjury = new Injury({ injury, user });
    newinjury.save((err) => {
      if (err) {
        res.status(400).json({ status: "error", error: err });
      } else {
        res.status(201).json({ status: "ok", message: "successful creation" });
      }
    });
  },
];
