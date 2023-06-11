const Course = require("../models/course");
const {
  multiplesMongooseToObject: multiplesMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

class SiteController {
  // [GET] /
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", { courses: multiplesMongooseToObject(courses) });
      })
      .catch(next);

    // res.render("home");
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
