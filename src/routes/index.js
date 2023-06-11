"use strict";
const newsRouter = require("./news");
const meRouter = require("./me");
const siteRouter = require("./site");
const coursesRouter = require("./courses");

function routes(app) {
  app.use("/me", meRouter);
  app.use("/courses", coursesRouter);

  app.use("/news", newsRouter);

  app.use("/", siteRouter);
}

module.exports = routes;
