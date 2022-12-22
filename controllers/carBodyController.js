const CarBody = require("../models/carBody");
const { body, validationResult } = require("express-validator");

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
  res.render("carbody_form", { title: "Create car body type" });
};

exports.carbody_create_post = [
  body("name", "Car body name required").trim().isLength({ min: 1 }).escape,
  body("description", "Description required")
    .trim()
    .islength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = valitationResult(req);
    const carbody = new CarBody({
      name: req.body.name,
      description: req.body.description,
    });
    if (!errors.isEmpty()) {
      res.render("carbody_form", {
        title: "Create car body type",
        carbody,
        errors: errors.array(),
      });
      return;
    } else {
      CarBody.findOne({ name: req.body.name }).exec((err, found_carbody) => {
        if (err) {
          return next(err);
        }
        if (found_carbody) {
          res.redirect(found_carbody.url);
        } else {
          carbody.save((err) => {
            if (err) {
              return next(err);
            }
            res.redirect(carbody.url);
          });
        }
      });
    }
  },
];

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
