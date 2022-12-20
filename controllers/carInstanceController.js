const CarInstance = require("../models/carInstance");

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

exports.caristance_detail = (req, res) => {
  res.send(`Not implemented Car Instance Detail: ${req.params.id}`);
};

exports.carinstance_create_get = (req, res) => {
  res.send("Not implemented CarInstance Create GET");
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
