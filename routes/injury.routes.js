const express = require("express");
const router = express.Router();
const injuryController = require("../controllers/injury.controller");

router.get("/");

// get router

// post router
router.post("/injury", injuryController.injuries__post);
// edit router

// delete router

module.exports = router;
