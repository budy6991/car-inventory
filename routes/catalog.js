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
