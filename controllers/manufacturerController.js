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
        Manufacturer.findById(req.params.id).exec(callback);
      },
      manufacturer_cars(callback) {
        Car.find({ manufacturer: req.params.id })
          .populate("brand")
          .exec(callback);
      },
      manufacturer_brands(callback) {
        Brand.find({ manufacturer: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      console.log(results);
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
        brands: results.manufacturer_brands,
      });
    }
  );
};

exports.manufacturer_create_get = (req, res, next) => {
  res.render("manufacturer_form", {
    title: "Create Manufacturer",
  });
};

exports.manufacturer_create_post = [
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

  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    const manufacturer = new Manufacturer({
      name: req.body.name,
      description: req.body.description,
      headquarters: req.body.headquarters,
    });
    if (!errors.isEmpty()) {
      res.render("manufacturer_form", {
        title: "Create Manufacturer",

        errors: errors.array(),
        manufacturer,
      });
    }
    // If data from form is valid:
    manufacturer.save((err) => {
      return next(err);
    });
    res.redirect(manufacturer.url);
  },
];

exports.manufacturer_delete_get = (req, res, next) => {
  async.parallel(
    {
      list_car(callback) {
        Car.find({ manufacturer: req.params.id }).exec(callback);
      },
      list_brand(callback) {
        Brand.find({ manufacturer: req.params.id }).exec(callback);
      },
      manufacturer(callback) {
        Manufacturer.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.list_car == null) {
        res.redirect("/catalog/manufacturers");
      }
      if (results.list_brand == null) {
        res.redirect("/catalog/manufacturers");
      }
      res.render("manufacturer_delete", {
        title: "Delete Manufacturer",
        car_list: results.list_car,
        brand_list: results.list_brand,
        manufacturer: results.manufacturer,
      });
    }
  );
};

exports.manufacturer_delete_post = (req, res, next) => {
  async.parallel(
    {
      list_car(callback) {
        Car.find({ manufacturer: req.params.id }).exec(callback);
      },
      list_brand(callback) {
        Brand.find({ manufacturer: req.params.id }).exec(callback);
      },
      manufacturer(callback) {
        Manufacturer.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.list_car == null) {
        res.render("manufacturer_delete", {
          title: "Delete Manufacturer",
          car_list: results.list_car,
          brand_list: results.list_brand,
          manufacturer: results.manufacturer,
        });
      }
      if (results.list_brand == null) {
        res.render("manufacturer_delete", {
          title: "Delete Manufacturer",
          car_list: results.list_car,
          brand_list: results.list_brand,
          manufacturer: results.manufacturer,
        });
      }
      Manufacturer.findByIdAndRemove(req.body.manufacturerid, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/catalog/manufacturers");
      });
    }
  );
};

exports.manufacturer_update_get = (req, res, next) => {
  Manufacturer.findById(req.params.id).exec((err, manufacturerResult) => {
    if (err) {
      return next(err);
    }
    if (manufacturerResult == null) {
      const err = new Error("Manufacturer not found");
      err.status = 404;
      return next(err);
    }
    res.render("manufacturer_form", {
      title: "Update Manufacturer",
      manufacturer: manufacturerResult,
    });
  });
};

exports.manufacturer_update_post = [
  body("name", "Please provide a name for the manufacturer")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Please provide a description for the manufacturer")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("headquarters", "Please provide headquarters information")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    const manufacturer = new Manufacturer({
      name: req.body.name,
      description: req.body.description,
      headquarters: req.body.headquarters,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("manufacturer_form", {
        title: "Update Manufacturer",
        manufacturer,
        errors: errors.array(),
      });
    }
    Manufacturer.findByIdAndUpdate(
      req.params.id,
      manufacturer,
      {},
      (err, theManufacturer) => {
        if (err) {
          return next(err);
        }
        res.redirect(theManufacturer.url);
      }
    );
  },
];
