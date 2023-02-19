const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/profile");
router.post("/register", userController.register__post);
router.post("/login");

module.exports = router;
