"use strict";

// Controller imports
const { User, Category, Food, FavoriteFood, sequelize } = require("../models");
const { createToken, verifyToken } = require("../helper/jwt");
const { compPass } = require("../helper/pass");
const { responseUserAttributes } = require("../helper/response-attributes");
const { Op } = require("sequelize");
////

//////
const { OAuth2Client } = require("google-auth-library");
const {generateQRCode} = require("../helper/happi-dev");
const { OAUTH_ID } = process.env;

const oAuthClient = new OAuth2Client(OAUTH_ID);
//////

class PublicController {
	static async postLogin(req, res, next) {
		try {
			const { access_token } = req.headers;
			
			let user;
			if (access_token) {
				const payload = verifyToken(access_token);

				if (payload?.id) user = await User.findByPk(payload.id);
			}
			if (isNaN(Number(user?.id))) {
				const { email, password } = req.body;

				if (!email || !password) {
					throw { name: "Invalid username or password" };
				}

				user = await User.findOne({
					where: {
						email,
					},
					attributes: ["password", "id", "role"]
				});

				if (!user || user.role !== "Customer" || !compPass(password, user.password)) {
					// console.log(user, '<<<<<<<<<<<<<<<<<<<<<<');
					throw { name: "Invalid username or password" };
				}
			}

			res.status(200).json({
				access_token: createToken({
					id: user.id,
				}),
				user: await User.findByPk(user.id, {
					attributes: responseUserAttributes(),
				}),
			});
		} catch (err) {
			next(err);
		}
	}

	static async getAuthGoogle(req, res, next) {
		try {
			const { google_auth } = req.headers;
			const ticket = await oAuthClient.verifyIdToken({
				idToken: google_auth,
				audience: OAUTH_ID,  // Specify the CLIENT_ID of the app that accesses the backend
				// Or, if multiple clients access the backend:
				//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
			});
			const payload = ticket.getPayload();

			const { email, name, picture } = payload;
			// 							role: currently only accept Customer
			const [user, created] = await User.findOrCreate({
				where: { email, },
				defaults: { username: name, email, password: "gautpass", role: "Customer" },
				hooks: false
			});

			if (!user) {
				throw { name: "Failed to create user" };
			}
			
			res.status(created ? 201 : 200).json({
				access_token: createToken({
					id: user.id,
				}),
				user: await User.findByPk(user.id, {
					attributes: responseUserAttributes(),
				}),
			});
		}
		catch (err) {
			next(err);
		}
	}

	static async postRegister(req, res, next) {
		try {
			const { username, email, password, phoneNumber, address } = req.body;

			// 							role: currently only accept Customer
			const user = await User.create({ username, email, password, role: "Customer", phoneNumber, address });

			if (!user) {
				throw { name: "Failed to create user" };
			}

			res.status(201).json({
				access_token: createToken({
					id: user.id,
				}),
				user: await User.findByPk(user.id, {
					attributes: responseUserAttributes(),
				}),
			});
		} catch (err) {
			next(err);
		}
	}

	static async getFood(req, res, next) {
		const itemsPerPage = 9;
		try {
			const { page = 1, search, cat } = req.query;

			const where = {
				status: "Active",
			};

			// input text filter
			if (search) {
				where.name = {
					[Op.iLike]: `%${search}%`
				};
			}

			// exact string, checkbox style filter
			if (cat) {
				// should be array type
				where.categoryId = {
					[Op.or]: cat
				};
			}

			const food = await Food.findAll({
				limit: itemsPerPage,
				offset: (page-1) * itemsPerPage,
				include: [
					{
						model: Category,
					},
				],
				where,
				order: [["createdAt", "DESC"]],
			});

			const totalItems = await Food.count({
				where,
			});

			res.status(200).json({
			  pageInfo: {
			    totalItems,
			    itemsPerPage,
			    currentPage: page,
			  },
			  food,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getFoodWithId(req, res, next) {
		try {
			const id = Number(req.params.id);
			if (isNaN(id)) throw { name: "Food not found" };
			const data = await Food.findOne({
				where: { id },
				include: [
					{
						model: Category,
					},
					{
						model: FavoriteFood,
					},
				]
			});
			if (!data) {
				throw { name: "Food not found" };
			}
			res.status(200).json(data);
		} catch (err) {
			next(err);
		}
	}

	static async getFavorites(req, res, next) {
		try {
			const favs = await Food.findAll({
				include: [
					{
						model: Category,
					},
					{
						model: FavoriteFood,
						where: {
							UserId: req.user.id,
						},
						// include: [
						// 	{
						// 		model: User,
						// 	},
						// ],
					},
				],
				order: [["createdAt", "DESC"]],
			});

			res.status(200).json(favs || []);
		} catch (err) {
			next(err);
		}
	}

	static async postFavorites(req, res, next) {
		try {
			const { id } = req.body;

			const food = await Food.findByPk(id);

			if (!food) {
				throw {
					name: "Food not found"
				};
			}

			const exist = await FavoriteFood.findOne({
				where: {
					FoodId: id,
					UserId: req.user.id,
				}
			});

			if (exist) {
				throw {
					name: "This menu is already in your favorite list",
				};
			}

			const fav = await FavoriteFood.create({
				UserId: req.user.id,
				FoodId: id,
			});

			res.status(201).json(fav);
		} catch (err) {
			next(err);
		}
	}

	static async deleteFavorites(req, res, next) {
		try {
			const { id } = req.params;

			const food = await FavoriteFood.findByPk(id, {
				include: [Food, User],
			});

			if (!food) {
				throw {
					name: "Favorite not found"
				};
			}

			await food.destroy();

			res.status(200).json(food);
		} catch (err) {
			next(err);
		}
	}

	static async getQRCode(req, res, next) {
		try {
			const { code } = req.query;

			const response = await generateQRCode(code);

			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}

	static async getCategories(req, res, next) {
		try {
			res.status(200).json(await Category.findAll());
		} catch (err) {
			next(err);
		}
	}
}

module.exports = PublicController;
