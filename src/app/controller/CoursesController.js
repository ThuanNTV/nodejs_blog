const Course = require("../models/course");
const {
  multiplesMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

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
    req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg`;
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect("/me/stored/courses"))
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

  // /courses/64883f545dcb45dc24383c98/restore TODO:restore not working
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Action is invalid" });
    }
  }
}

module.exports = new CoursesController();
