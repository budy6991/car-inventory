const Brand = require("../models/brand");
const Car = require("../models/car");
const async = require("async");

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
        Brand.findById(req.params.id).exec(callback);
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

exports.brand_create_get = (req, res) => {
  res.send("Not implemented Brand Create GET");
};

exports.brand_create_post = (req, res) => {
  res.send("Not implemented Brand Create POST");
};

exports.brand_delete_get = (req, res) => {
  res.send("Not implemented Brand delete GET");
};

exports.brand_delete_post = (req, res) => {
  res.send("Not implemented Brand delete POST");
};

exports.brand_update_get = (req, res) => {
  res.send("Not implemented Brand Update GET");
};

exports.brand_update_post = (req, res) => {
  res.send("Not implemented Brand Update POST");
};
