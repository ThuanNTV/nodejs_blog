const course = require("../models/course");
const Course = require("../models/course");
const {
  multiplesMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

class CoursesController {
  // [GET] /
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) =>
        res.render("courses/show", {
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }
}

module.exports = new CoursesController();
