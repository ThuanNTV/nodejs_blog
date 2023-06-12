const Course = require("../models/course");
const {
  multiplesMongooseToObject: multiplesMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

class MeController {
  // [GET] /search
  storedCourse(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("me/stored-Course", {
          courses: multiplesMongooseToObject(courses),
        });
      })
      .catch(next);
  }
  trashCourse(req, res, next) {
    Course.findDeleted({})
      .then((courses) => {
        res.render("me/trash-Course", {
          courses: multiplesMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
