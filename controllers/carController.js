const Car = require("../models/car");
const Brand = require("../models/brand");
const CarBody = require("../models/carBody");
const Manufacturer = require("../models/manufacturer");
const CarInstance = require("../models/carInstance");

exports.index = (req, res, next) => {
  res.send("Not implemented: Site Home Page");
};

exports.car_list = (req, res) => {
  res.send("Not implemented: Car List");
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
