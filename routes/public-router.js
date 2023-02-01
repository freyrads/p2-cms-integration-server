"use strict";

/*

post /register
post /login
get /food (many filters, pagination)
get /auth/google-sign-in

*/


const { Router } = require("express");
const Controller = require("../controller/PublicController");
const { authentication } = require("../middlewares/auth");
const {errorHandler} = require("../middlewares/error-handler");

const router = Router();

// google auth
router.get("/auth/google-sign-in", Controller.getAuthGoogle);

// register admin
router.post("/register", Controller.postRegister);

// login admin/Staff
router.post("/login", Controller.postLogin);

// get categories
router.get("/categories", Controller.getCategories);

// food routes
router.get("/food", Controller.getFood);

// auth CRD
router.use((req, res, next) => {
	authentication(req, res, (err) => {
		if (err) {
			return next(err);
		}

		try {
			if (req.user.role !== "Customer") {
				throw {
					name: "Public endpoint can only be accessed by customer",
				};
			}

			next();
		} catch (err) {
			next(err);
		}
	});
});

// get qr code
router.get("/qrcode", Controller.getQRCode);

// get food
router.get("/food/:id", Controller.getFoodWithId);

// favorites routes
// Controller.getFavorites
router.get("/favorites", Controller.getFavorites);

// Controller.postFavorites
router.post("/favorites", Controller.postFavorites);

router.delete("/favorites/:id", Controller.deleteFavorites);

router.use(errorHandler);

module.exports = router;
