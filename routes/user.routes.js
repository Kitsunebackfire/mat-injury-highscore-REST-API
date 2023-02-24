const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/profile", (req, res) => {
  res.status(200);
});
router.post("/register", userController.register__post);
router.post("/login", userController.login__post);

module.exports = router;
