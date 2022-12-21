const Manufacturer = require("../models/manufacturer");
const Car = require("../models/car");
const Brand = require("../models/car");
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
  async.parallel({
    manufacturer(callback) {
      Manufacturer.findById(req.param.id).exec(callback);
    },
  });
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
