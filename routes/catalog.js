const express = require("express");
const router = express.Router();

const brand_controller = require("../controllers/brandController");
const carbody_controller = require("../controllers/carBodyController");
const car_controller = require("../controllers/carController");
const carinstance_controller = require("../controllers/carInstanceController");
const manufacturer_controller = require("../controllers/manufacturerController");

// Car Routes

router.get("/", car_controller.index);

router.get("/car/create", car_controller.car_create_get);

router.post("/car/create", car_controller.car_create_post);

router.get("/car/:id/delete", car_controller.car_delete_get);

router.post("/car/:id/delete", car_controller.car_delete_post);

router.get("/car/:id/update", car_controller.car_update_get);

router.post("/car/:id/update", car_controller.car_update_post);

router.get("/car/:id", car_controller.car_detail);

router.get("/cars", car_controller.car_list);

// Brand Routes

router.get("/brand/create", brand_controller.brand_create_get);

router.post("/brand/create", brand_controller.brand_create_post);

router.get("/brand/:id/delete", brand_controller.brand_delete_get);

router.post("/brand/:id/delete", brand_controller.brand_delete_post);

router.get("/brand/:id/update", brand_controller.brand_update_get);

router.post("/brand/:id/update", brand_controller.brand_update_post);

router.get("/brand/:id", brand_controller.brand_detail);

router.get("/brands", brand_controller.brand_list);

// Car Body Routes.

router.get("/carbody/create", carbody_controller.carbody_create_get);

router.post("/carbody/create", carbody_controller.carbody_create_post);

router.get("/carbody/:id/delete", carbody_controller.carbody_delete_get);

router.post("/carbody/:id/delete", carbody_controller.carbody_delete_post);

router.get("/carbody/:id/update", carbody_controller.carbody_update_get);

router.post("/carbody/:id/update", carbody_controller.carbody_update_post);

router.get("/carbody/:id", carbody_controller.carbody_detail);

router.get("/carbodies", carbody_controller.carbody_list);

// Car Instances Routes

router.get(
  "/carinstance/create",
  carinstance_controller.carinstance_create_get
);

router.post(
  "/carinstance/create",
  carinstance_controller.carinstance_create_post
);

router.get(
  "/carinstance/:id/delete",
  carinstance_controller.carinstance_delete_get
);

router.post(
  "/carinstance/:id/delete",
  carinstance_controller.carinstance_delete_post
);

router.get(
  "/carinstance/:id/update",
  carinstance_controller.carinstance_update_get
);

router.post(
  "/carinstance/:id/update",
  carinstance_controller.carinstance_update_post
);

router.get("/carinstance/:id", carinstance_controller.caristance_detail);

router.get("/carinstances", carinstance_controller.carinstance_list);

// Manufacturer Routes

router.get(
  "/manufacturer/create",
  manufacturer_controller.manufacturer_create_get
);

router.post(
  "/manufacturer/create",
  manufacturer_controller.manufacturer_create_post
);

router.get(
  "/manufacturer/:id/delete",
  manufacturer_controller.manufacturer_delete_get
);

router.post(
  "/manufacturer/:id/delete",
  manufacturer_controller.manufacturer_delete_post
);

router.get(
  "/manufacturer/:id/update",
  manufacturer_controller.manufacturer_update_get
);

router.post(
  "/manufacturer/:id/update",
  manufacturer_controller.manufacturer_update_post
);

router.get("/manufacturer/:id", manufacturer_controller.manufacturer_detail);

router.get("/manufacturers", manufacturer_controller.manufacturer_list);

module.exports = router;
