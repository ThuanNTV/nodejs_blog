const express = require("express");
const router = express.Router();

const coursesController = require("../app/controller/CoursesController");

router.get("/create", coursesController.create);
router.post("/lib", coursesController.lib);
router.get("/:slug", coursesController.show);

module.exports = router;
