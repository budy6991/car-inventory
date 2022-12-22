const CarBody = require("../models/carBody");

exports.carbody_list = (req, res, next) => {
  CarBody.find()
    .sort({ name: 1 })
    .exec(function (err, list_carbody) {
      if (err) {
        return next(err);
      }
      res.render("carbody_list", {
        title: "List of car body types",
        carbody_list: list_carbody,
      });
    });
};

exports.carbody_detail = (req, res, next) => {
  CarBody.findById(req.params.id).exec(function (err, carbody_detail) {
    if (err) {
      return next(err);
    }
    res.render("carbody_detail", {
      title: "Car Body Type detail",
      carbody: carbody_detail,
    });
  });
};

exports.carbody_create_get = (req, res) => {
  res.send("Not implemented CarBody create GET");
};

exports.carbody_create_post = (req, res) => {
  res.send("Not implemented CarBody create POST");
};

exports.carbody_delete_get = (req, res) => {
  res.send("Not implemented CarBody delete GET");
};

exports.carbody_delete_post = (req, res) => {
  res.send("Not implemented CarBody delete GET");
};

exports.carbody_update_get = (req, res) => {
  res.send("Not implemented CarBody update GET");
};

exports.carbody_update_post = (req, res) => {
  res.send("Not implemented CarBody update POST");
};
