const Car = require("../models/car");
const Brand = require("../models/brand");
const CarBody = require("../models/carBody");
const Manufacturer = require("../models/manufacturer");
const CarInstance = require("../models/carInstance");
const { body, validationResult } = require("express-validator");

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

exports.car_detail = (req, res, next) => {
  async.parallel(
    {
      car(callback) {
        Car.findById(req.params.id)
          .populate("manufacturer")
          .populate("car_body")
          .populate("brand")
          .exec(callback);
      },
      car_instance(callback) {
        CarInstance.find({ car: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.car == null) {
        const err = new Error("Car not found");
        err.status = 404;
        return next(err);
      }
      res.render("car_detail", {
        title: results.car.fullModelName,
        car: results.car,
        car_instances: results.car_instance,
      });
    }
  );
};

exports.car_create_get = (req, res, next) => {
  // Name, model, year, price, manufacturer, car_body, brand
  async.parallel(
    {
      list_manufacturer(callback) {
        Manufacturer.find().sort({ name: 1 }).exec(callback);
      },
      list_car_body(callback) {
        CarBody.find().sort({ name: 1 }).exec(callback);
      },
      list_brand(callback) {
        Brand.find().sort({ name: 1 }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("car_form", {
        title: "Create Car",
        manufacturer_list: results.list_manufacturer,
        car_body_list: results.list_car_body,
        brand_list: results.list_brand,
      });
    }
  );
};

exports.car_create_post = [
  body("name", "Car name required").trim().isLength({ min: 1 }).escape(),
  body("model", "Car Model required").trim().isLength({ min: 1 }).escape(),
  body("year", "Year is required").trim().isLength({ min: 1 }).escape(),
  body("description", "A description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Car price is required").trim().isLength({ min: 1 }).escape(),
  body("manufacturer").escape(),
  body("brand").escape(),
  body("car_body").escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const car = new Car({
      name: req.body.name,
      model: req.body.model,
      year: req.body.year,
      description: req.body.description,
      price: req.body.price,
      manufacturer: req.body.manufacturer,
      brand: req.body.brand,
      car_body: req.body.car_body,
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          car(callback) {
            Car.findById(req.body.id)
              .populate("brand")
              .populate("manufacturer")
              .populate("car_body")
              .exec(callback);
          },
          manufacturers(callback) {
            Manufacturer.find().sort({ name: 1 }).exec(callback);
          },
          brands(callback) {
            Brand.find().sort({ name: 1 }).exec(callback);
          },
          car_bodies(callback) {
            CarBody.find().sort({ name: 1 }).exec(callback);
          },
        },

        (err, results) => {
          if (err) {
            return next(err);
          }
          res.render("car_form", {
            title: "Create Car",
            car: car,
            manufacturer_list: results.manufacturers,
            brand_list: results.brands,
            car_body_list: results.car_bodies,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    car.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(car.url);
    });
  },
];

exports.car_delete_get = (req, res, next) => {
  async.parallel(
    {
      car(callback) {
        Car.findById(req.params.id).exec(callback);
      },
      car_instance(callback) {
        CarInstance.find({ car: req.params.id }).exec(callback);
      },
    },

    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.car == null) {
        res.redirect("/catalog/cars");
      }
      res.render("car_delete", {
        title: "Delete Car",
        car: results.car,
        carinstance: results.car_instance,
      });
    }
  );
};

exports.car_delete_post = (req, res, next) => {
  async.parallel(
    {
      car(callback) {
        Car.findById(req.params.id).exec(callback);
      },
      car_instance(callback) {
        CarInstance.find({ car: req.params.id }).populate("car").exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.car_instance.length > 0) {
        res.render("car_delete", {
          title: "Delete Car",
          car: results.car,
          carinstance: results.car_instance,
        });
        return;
      }
      Car.findByIdAndRemove(req.body.carid, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/catalog/cars");
      });
    }
  );
};

exports.car_update_get = (req, res, next) => {
  async.parallel(
    {
      car(callback) {
        Car.findById(req.params.id)
          .populate("brand")
          .populate("manufacturer")
          .populate("car_body")
          .exec(callback);
      },

      list_manufacturer(callback) {
        Manufacturer.find().sort({ name: 1 }).exec(callback);
      },
      list_car_body(callback) {
        CarBody.find().sort({ name: 1 }).exec(callback);
      },
      list_brand(callback) {
        Brand.find().sort({ name: 1 }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.car == null) {
        const err = new Error("Car not found");
        err.status = 404;
        return next(err);
      }
      res.render("car_form", {
        title: "Update Car",
        car: results.car,
        manufacturer_list: results.list_manufacturer,
        car_body_list: results.list_car_body,
        brand_list: results.list_brand,
      });
    }
  );
};

exports.car_update_post = [
  body("name", "Car name required").trim().isLength({ min: 1 }).escape(),
  body("model", "Car Model required").trim().isLength({ min: 1 }).escape(),
  body("year", "Year is required").trim().isLength({ min: 1 }).escape(),
  body("description", "A description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Car price is required").trim().isLength({ min: 1 }).escape(),
  body("manufacturer").escape(),
  body("brand").escape(),
  body("car_body").escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const car = new Car({
      name: req.body.name,
      model: req.body.model,
      year: req.body.year,
      description: req.body.description,
      price: req.body.price,
      manufacturer: req.body.manufacturer,
      brand: req.body.brand,
      car_body: req.body.car_body,
      // Important! Old ID
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          manufacturers(callback) {
            Manufacturer.find().sort({ name: 1 }).exec(callback);
          },
          brands(callback) {
            Brand.find().sort({ name: 1 }).exec(callback);
          },
          car_bodies(callback) {
            CarBody.find().sort({ name: 1 }).exec(callback);
          },
        },

        (err, results) => {
          if (err) {
            return next(err);
          }
          res.render("car_form", {
            title: "Update Car",
            manufacturer_list: results.manufacturers,
            brand_list: results.brands,
            car_body_list: results.car_bodies,
            car,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    Car.findByIdAndUpdate(req.params.id, car, {}, (err, thecar) => {
      if (err) {
        return next(err);
      }
      res.redirect(thecar.url);
    });
  },
];
