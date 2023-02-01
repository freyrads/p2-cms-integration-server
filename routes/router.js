"use strict";

const { Router } = require("express");
const Controller = require("../controller/Controller");
const { authentication, deleteUserAuth, deleteCategoryAuth } = require("../middlewares/auth");
const {errorHandler} = require("../middlewares/error-handler");
const foodRouter = require("./food");

const publicRouter = require("./public-router");

const router = Router();

router.use("/public", publicRouter);

// google auth
router.get("/auth/google-sign-in", Controller.getAuthGoogle);

// register admin
router.post("/register", Controller.postRegister);

// login admin/Staff
router.post("/login", Controller.postLogin);

// auth CRD
router.use(authentication);

// create category
router.post("/categories", Controller.postCategories);

// get categories
router.get("/categories", Controller.getCategories);

// get category
router.get("/categories/:id", Controller.getCategoriesWithId);

// delete category
router.delete("/categories/:id", deleteCategoryAuth, Controller.deleteCategoriesWithId);

// get user
router.get("/users/:id", Controller.getUsersFromId);

// get users
router.get("/users", Controller.getUsers);

// delete user
router.delete("/users/:id", deleteUserAuth, Controller.deleteUsersWithId);

// get all history
router.get("/histories", Controller.getHistories);

// food routes
router.use("/food", foodRouter);

router.use(errorHandler);

module.exports = router;
