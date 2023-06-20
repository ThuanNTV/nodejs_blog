"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
var methodOverride = require("method-override");
const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");
const SortMiddleware = require("./app/middleware/SortMiddleware");

// format date

// connect db
db.connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(SortMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// XMLHttpRequest, fetch

// HTTP logger
// app.use(morgan("combined"));

// Template engine

app.engine(
  "hbs",
  handlebars.engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortTable: (field, sort) => {
        const sortType = field === sort.colum ? sort.type : "default";

        const icons = {
          default: "bi bi-filter-circle",
          asc: "bi bi-sort-alpha-down",
          desc: "bi bi-sort-alpha-down-alt",
        };

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };
        const icon = icons[sortType];
        const type = types[sortType];

        const href = `?_sort&column=${field}&type=${type}`;
        return `<a href="${href}"><i class="${icon}"></i></a>`;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
