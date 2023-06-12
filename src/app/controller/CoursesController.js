const Course = require("../models/course");
const {
  multiplesMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
const course = require("../models/course");

class CoursesController {
  // [GET] /
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then(
        (course) =>
          res.render("courses/show", {
            course: mongooseToObject(course),
          }),
        console.log(course)
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

  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", {
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }

  update(req, res, next) {
    const formData = req.body;
    Course.updateOne({ _id: req.params.id }, formData)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new CoursesController();
