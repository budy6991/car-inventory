const Brand = require("../models/brand");
const Manufacturer = require("../models/manufacturer");
const Car = require("../models/car");
const async = require("async");
const { body, validationResult } = require("express-validator");

exports.brand_list = (req, res, next) => {
  Brand.find()
    .sort({ name: 1 })
    .exec(function (err, list_brands) {
      if (err) {
        return next(err);
      }
      res.render("brand_list", {
        title: "List of car Brands",
        brand_list: list_brands,
      });
    });
};

exports.brand_detail = (req, res, next) => {
  async.parallel(
    {
      brand(callback) {
        Brand.findById(req.params.id).populate("manufacturer").exec(callback);
      },
      brand_cars(callback) {
        Car.find({ brand: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.brand == null) {
        const err = new Error("Brand not found");
        err.status = 404;
        return next(err);
      }
      res.render("brand_detail", {
        title: "Brand Detail",
        brand: results.brand,
        brand_cars: results.brand_cars,
      });
    }
  );
};

exports.brand_create_get = (req, res, next) => {
  Manufacturer.find()
    .sort({ name: 1 })
    .exec(function (err, list_manufacturer) {
      if (err) {
        return next(err);
      }
      res.render("brand_form", {
        title: "Create Brand",
        manufacturer_list: list_manufacturer,
      });
    });
};

exports.brand_create_post = [
  body("name", "Brand name is required").trim().isLength({ min: 1 }).escape(),
  body("description", "Brand description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("manufacturer").escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const brand = new Brand({
      name: req.body.name,
      description: req.body.description,
      manufacturer: req.body.manufacturer,
    });
    if (!errors.isEmpty()) {
      Manufacturer.find()
        .sort({ name: 1 })
        .exec(function (err, list_manufacturer) {
          if (err) {
            return next(err);
          }
          res.render("brand_form", {
            title: "Create Brand",
            manufacturer_list: list_manufacturer,
          });
        });
    }
    // If data from form is valid:
    brand.save((err) => {
      return next(err);
    });
    res.redirect(brand.url);
  },
];

exports.brand_delete_get = (req, res, next) => {
  async.parallel(
    {
      brand(callback) {
        Brand.findById(req.params.id).exec(callback);
      },
      car(callback) {
        Car.find({ brand: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.brand == null) {
        res.redirect("/catalog/brands");
      }
      res.render("brand_delete", {
        title: "Delete Brand",
        brand: results.brand,
        car: results.car,
      });
    }
  );
};

exports.brand_delete_post = (req, res, next) => {
  async.parallel(
    {
      brand(callback) {
        Brand.findById(req.body.brandid).exec(callback);
      },
      car(callback) {
        Car.find({ brand: req.body.brandid }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.car.length > 0) {
        res.render("brand_delete", {
          title: "Delete Brand",
          brand: results.brand,
          car: results.car,
        });
        return;
      }
      Brand.findByIdAndRemove(req.body.brandid, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/catalog/brands");
      });
    }
  );
};

exports.brand_update_get = (req, res) => {
  res.send("Not implemented Brand Update GET");
};

exports.brand_update_post = (req, res) => {
  res.send("Not implemented Brand Update POST");
};
