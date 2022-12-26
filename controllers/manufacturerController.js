const Manufacturer = require("../models/manufacturer");
const Car = require("../models/car");
const Brand = require("../models/brand");
const async = require("async");
const { body, validationResult } = require("express-validator");

exports.manufacturer_list = (req, res, next) => {
  Manufacturer.find({}, "name headquarters")
    .sort({ name: 1 })
    .exec(function (err, list_manufacturer) {
      if (err) {
        return next(err);
      }
      res.render("manufacturer_list", {
        title: "List of car manufacturers",
        manufacturer_list: list_manufacturer,
      });
    });
};

exports.manufacturer_detail = (req, res, next) => {
  async.parallel(
    {
      manufacturer(callback) {
        Manufacturer.findById(req.params.id).populate("brands").exec(callback);
      },
      manufacturer_cars(callback) {
        Car.find({ manufacturer: req.params.id })
          .populate("brand")
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.manufacturer == null) {
        const err = new Error("Manufacturer not found");
        err.status = 404;
        return next(err);
      }
      res.render("manufacturer_detail", {
        title: "Manufacturer Detail",
        manufacturer: results.manufacturer,
        cars: results.manufacturer_cars,
      });
      console.log(results);
    }
  );
};

exports.manufacturer_create_get = (req, res, next) => {
  Brand.find({}, "name")
    .sort({ name: 1 })
    .exec((err, brands) => {
      if (err) {
        return next(err);
      }
      res.render("manufacturer_form", {
        title: "Create Manufacturer",
        brand_list: brands,
      });
    });
};

exports.manufacturer_create_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.brands)) {
      req.body.brands =
        typeof req.body.brands === "undefined" ? [] : [req.body.brands];
    }
    return next();
  },
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters"),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Please provide a description"),
  body("headquarters", "Please provide headquarters information")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brands.*").escape(),
  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    const manufacturer = new Manufacturer({
      name: req.body.name,
      description: req.body.description,
      headquarters: req.body.headquarters,
      brands: req.body.brands,
    });
    if (!errors.isEmpty()) {
      Brand.find({}, "name").exec(function (err, brands) {
        if (err) {
          return next(err);
        }
        for (const brand in brands) {
          if (brand.includes(brand._id)) {
            brand.checked = "true";
          }
        }
        res.render("manufacturer_form", {
          title: "Create Manufacturer",
          brand_list: brands,
          selected_brand: manufacturer.brands._id,
          errors: errors.array(),
          manufacturer,
        });
      });
    }
    // If data from form is valid:
    manufacturer.save((err) => {
      return next(err);
    });
    res.redirect(manufacturer.url);
  },
];

exports.manufacturer_delete_get = (req, res) => {
  res.send("Not implemented: Manufacturer Delete Get");
};

exports.manufacturer_delete_post = (req, res) => {
  res.send("Not implemented: Manufacturer Delete POST");
};

exports.manufacturer_update_get = (req, res) => {
  res.send("Not implemented: Manufacturer Update GET");
};

exports.manufacturer_update_post = (req, res) => {
  res.send("Not implemented: Manufacturer Update POST");
};
