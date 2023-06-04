const express = require("express");
const router = express.Router();

const newsController = require("../app/controller/NewsController");

router.use("/:slug", newsController.show);

// [end]
router.use("/", newsController.index);

module.exports = router;
