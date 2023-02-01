"use strict";

const { verifyToken } = require("../helper/jwt");
const { User, Food } = require("../models");

const authentication = async (req, res, next) => {
	try {
		const { access_token } = req.headers;

		if (!access_token) {
			throw { name: "Unauthorized" };
		}

		const payload = verifyToken(access_token);

		if (isNaN(Number(payload?.id))) {
			throw { name: "Invalid token" };
		}

		const user = await User.findByPk(payload.id);

		if (!user) {
			throw { name: "Invalid token" };
		}

		req.user = user;

		next();
	} catch (err) {
		next(err);
	}
};

const deleteUserAuth = async (req, res, next) => {
	try {
		const userToDeleteId = req.params.id;
		const { id, role } = req.user;

		const userToDelete = await User.findByPk(userToDeleteId);

		if (!userToDelete) {
			throw { name: "User not found" };
		}

		if (userToDelete.id !== id && role !== "Admin") {
			throw { name: "Forbidden" };
		}

		next();
	} catch (err) {
		next(err);
	}
}

const modifyFoodAuth = async (req, res, next) => {
	try {
		const foodToModifyId = req.params.id;
		const { id, role } = req.user;

		const foodToModify = await Food.findByPk(foodToModifyId);

		if (!foodToModify) {
			throw { name: "Food not found" };
		}

		if (foodToModify.authorId !== id && role !== "Admin") {
			throw { name: "Forbidden" };
		}

		next();
	} catch (err) {
		next(err);
	}
	
}

const adminOnly = async (req, res, next) => {
	try {
		if (req.user.role !== "Admin") {
			throw { name: "Forbidden" };
		}

		next();
	} catch (err) {
		next(err);
	}
}

const deleteCategoryAuth = (req, res, next) => {
	// if (req.user.role !== "Admin") {
	// 	return next({
	// 		name: "Forbidden",
	// 	});
	// }

	next();
}

module.exports = {
	authentication,
	deleteUserAuth,
	modifyFoodAuth,
	deleteCategoryAuth,
	adminOnly,
};
