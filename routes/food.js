"use strict";

const { Router } = require("express");
const Controller = require("../controller/Controller");
const { modifyFoodAuth, adminOnly, } = require("../middlewares/auth");

const router = Router();

// create food
router.post("/", Controller.postFood);

// get food
router.get("/", Controller.getFood);

// get food
router.get("/:id", Controller.getFoodWithId);

// modify auth
router.use("/:id", modifyFoodAuth);

// replace food
router.put("/:id", Controller.putFood);

// delete food
router.delete("/:id", Controller.deleteFoodWithId);

// patch food status, admin only
router.patch("/:id", adminOnly, Controller.patchFoodStatus);

module.exports = router;
