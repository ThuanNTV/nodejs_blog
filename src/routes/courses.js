const express = require("express");
const router = express.Router();

const coursesController = require("../app/controller/CoursesController");

router.get("/create", coursesController.create);
router.post("/lib", coursesController.lib);
router.get("/:id/edit", coursesController.edit);
router.put("/:id", coursesController.update);
//TODO: review restore
router.patch("/:id/restore", coursesController.restore);
router.delete("/:id", coursesController.delete);
router.get("/:slug", coursesController.show);

module.exports = router;
