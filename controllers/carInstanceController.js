const CarInstance = require("../models/carInstance");
const Car = require("../models/car");

exports.carinstance_list = (req, res, next) => {
  CarInstance.find()
    .populate("car")
    .exec(function (err, list_carinstance) {
      if (err) {
        return next(err);
      }
      res.render("carinstance_list", {
        title: "Car Instance List",
        carinstance_list: list_carinstance,
      });
    });
};

exports.caristance_detail = (req, res, next) => {
  CarInstance.findById(req.params.id)
    .populate("car")
    .exec(function (err, carinstance) {
      if (err) {
        return next(err);
      }
      res.render("carinstance_detail", {
        reference: carinstance._id,
        car_instance: carinstance,
      });
    });
};

exports.carinstance_create_get = (req, res, next) => {
  Car.find()
    .sort({ fullModelName: 1 })
    .exec(function (err, list_car) {
      if (err) {
        return next(err);
      }
      res.render("carinstance_form", {
        title: "Create Car Instance",
        car_list: list_car,
      });
    });
};

exports.carinstance_create_post = (req, res) => {
  res.send("Not implemented CarInstance Create POST");
};

exports.carinstance_delete_get = (req, res) => {
  res.send("Not implemented CarInstance delete GET");
};

exports.carinstance_delete_post = (req, res) => {
  res.send("Not implemented CarInstance delete POST");
};

exports.carinstance_update_get = (req, res) => {
  res.send("Not implemented CarInstance update GET");
};

exports.carinstance_update_post = (req, res) => {
  res.send("Not implemented CarInstance update POST");
};
