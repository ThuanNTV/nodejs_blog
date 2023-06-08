const Course = require("../models/course");

class SiteController {
  // [GET] /
  async index(req, res) {
    try {
      const data = await Course.find({});
      res.json(data);
    } catch {}

    // res.render("home");
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
