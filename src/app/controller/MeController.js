const Course = require("../models/course");
const {
  multiplesMongooseToObject: multiplesMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

class MeController {
  // [GET] /search
  storedCourse(req, res, next) {
    let coursesQuery = Course.find({});

    // if (req.query.hasOwnProperty("_sort")) {
    //   coursesQuery = coursesQuery.sort({
    //     [req.query.column]: req.query.type,
    //   });
    // }

    Promise.all([coursesQuery, Course.countDocumentsDeleted()]).then(
      ([courses, deletedCount]) =>
        res.render("me/stored-Course", {
          deletedCount,
          courses: multiplesMongooseToObject(courses),
        })
    );
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
