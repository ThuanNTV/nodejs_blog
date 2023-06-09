const express = require("express");
const router = express.Router();

const meController = require("../app/controller/MeController");

router.get("/stored/courses", meController.storedCourse);
router.get("/trash/courses", meController.trashCourse);

module.exports = router;
