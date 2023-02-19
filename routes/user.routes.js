const express = require("express");
const router = express.Router();

router.get("/profile");
router.post("/register");
router.post("/login");

module.exports = router;
