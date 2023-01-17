const CarBody = require("../models/carBody");
const Car = require("../models/car");
const async = require("async");
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
  async.parallel(
    {
      carbody(callback) {
        CarBody.findById(req.params.id).exec(callback);
      },
      carbodylist(callback) {
        Car.find({ car_body: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("carbody_detail", {
        title: "Car Body Type detail",
        carbody: results.carbody,
        carbody_list: results.carbodylist,
      });
    }
  );
};

exports.carbody_create_get = (req, res, next) => {
  res.render("carbody_form", { title: "Create car body type" });
};

exports.carbody_create_post = [
  body("name", "Car body name required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
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

exports.carbody_delete_get = (req, res, next) => {
  async.parallel(
    {
      car(callback) {
        Car.find({ car_body: req.params.id }).exec(callback);
      },
      car_body(callback) {
        CarBody.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.car == null) {
        res.render("/catalog/carbodies");
      }
      res.render("carbody_delete", {
        title: "Delete Car Body Type",
        car: results.car,
        carbody: results.car_body,
      });
    }
  );
};

exports.carbody_delete_post = (req, res, next) => {
  async.parallel(
    {
      car(callback) {
        Car.find({ car_body: req.params.id }).exec(callback);
      },
      car_body(callback) {
        CarBody.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.car.length > 0) {
        res.render("carbody_delete", {
          title: "Delete Car Body Type",
          car: results.car,
          carbody: results.car_body,
        });
        return;
      }
      CarBody.findByIdAndRemove(req.body.carbodyid, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/catalog/carbodies");
      });
    }
  );
};

exports.carbody_update_get = (req, res, next) => {
  CarBody.findById(req.params.id).exec((err, car_body) => {
    if (err) {
      return next(err);
    }
    if (car_body == null) {
      const err = new Error("Car body not found");
      err.status = 404;
      return next(err);
    }
    res.render("carbody_form", {
      title: "Update Car Body Type",
      carbody: car_body,
    });
  });
};

exports.carbody_update_post = [
  body("name", "Car body name required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const carbody = new CarBody({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("carbody_form", {
        title: "Update Car Body Type",
        carbody,
        errors: errors.array(),
      });
      return;
    }

    CarBody.findByIdAndUpdate(req.params.id, carbody, {}, (err, theCarBody) => {
      if (err) {
        return next(err);
      }
      res.redirect(theCarBody.url);
    });
  },
];
