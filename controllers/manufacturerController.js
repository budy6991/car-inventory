const Manufacturer = require("../models/manufacturer");
const Car = require("../models/car");
const Brand = require("../models/brand");
const async = require("async");

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
      manufacturer_brands(callback) {
        Brand.find({ manufacturer: req.params.id }).exec(callback);
      },
      manufacturer_cars(callback) {
        Car.find({ manufacturer: req.params.id })
          .populate("brand")
          .exec(callback);
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
        brands: results.manufacturer_brands,
        cars: results.manufacturer_cars,
      });
    }
  );
};

exports.manufacturer_create_get = (req, res) => {
  res.send("Not implemented: Manufacturer Create GET");
};

exports.manufacturer_create_post = (req, res) => {
  res.send("Not implemented: Manufacturer Create POST");
};

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
