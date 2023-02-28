const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/profile", (req, res) => {
  res.status(200);
});
router.post("/register", authController.register__post);
router.post("/login", authController.login__post);

module.exports = router;
