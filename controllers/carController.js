const Car = require("../models/car");
const Brand = require("../models/brand");
const CarBody = require("../models/carBody");
const Manufacturer = require("../models/manufacturer");
const CarInstance = require("../models/carInstance");

const async = require("async");

exports.index = (req, res, next) => {
  async.parallel(
    {
      car_count(callback) {
        Car.countDocuments({}, callback);
      },
      brand_count(callback) {
        Brand.countDocuments({}, callback);
      },
      carbody_count(callback) {
        CarBody.countDocuments({}, callback);
      },
      manufacturer_count(callback) {
        Manufacturer.countDocuments({}, callback);
      },
      carinstance_count(callback) {
        CarInstance.countDocuments({}, callback);
      },
      carinstance_available_count(callback) {
        CarInstance.countDocuments({ status: "Available" }, callback);
      },
    },
    (err, results) => {
      res.render("index", {
        title: "Car Inventory Home",
        error: err,
        data: results,
      });
    }
  );
};

exports.car_list = (req, res, next) => {
  Car.find({}, "name model year")
    .sort({ name: 1 })
    .populate("brand")
    .populate("car_body")
    .exec(function (err, list_cars) {
      if (err) {
        return next(err);
      }
      res.render("car_list", { title: "Car List", car_list: list_cars });
    });
};

exports.car_detail = (req, res) => {
  res.send(`Not implemented Car Detail: ${req.params.id}`);
};

exports.car_create_get = (req, res) => {
  res.send("Not implemented Car Create GET");
};

exports.car_create_post = (req, res) => {
  res.send("Not implemented Car Create POST");
};

exports.car_delete_get = (req, res) => {
  res.send("Not implemented Car Delete GET");
};

exports.car_delete_post = (req, res) => {
  res.send("Not implemented Car Delete POST");
};

exports.car_update_get = (req, res) => {
  res.send("Not implemented Car Update GET");
};

exports.car_update_post = (req, res) => {
  res.send("Not implemented Car Update POST");
};
