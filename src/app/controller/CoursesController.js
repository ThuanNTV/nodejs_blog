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

  // [GET]
  create(req, res, next) {
    res.render("courses/create");
  }

  // [POST]
  lib(req, res, next) {
    // res.json(req.body);
    const formData = req.body;
    formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg`;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }
}

module.exports = new CoursesController();
