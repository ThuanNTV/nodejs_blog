const Course = require("../models/course");
const {
  multiplesMongooseToObject: multiplesMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

class MeController {
  // [GET] /search
  storedCourse(req, res) {
    // TODO: Create me/stored-Course.hbs
    res.send("search");
  }
}

module.exports = new MeController();
