"use strict";

// Controller imports
const { User, Category, Food, History } = require("../models");
const { createToken, verifyToken } = require("../helper/jwt");
const { compPass } = require("../helper/pass");
const { responseUserAttributes } = require("../helper/response-attributes");
////

//////
const { OAuth2Client } = require("google-auth-library");
const { OAUTH_ID } = process.env;

const oAuthClient = new OAuth2Client(OAUTH_ID);
//////

class Controller {
	static async modifyOrUpdateFood(req, res, updateId) {
		const { name, description, price, imgUrl, categoryId } = req.body;

		const opt = { name, description, price, imgUrl, categoryId };

		updateId = Number(updateId);

		const isUpdate = !isNaN(updateId) && updateId > 0;
		
		if (!isUpdate) {
		  opt.authorId = req.user.id;
		}

		let food = await (isUpdate ? Food.update(opt, {
			where: {
				id: updateId,
			}
		}) : Food.create(opt));

		const { email } = req.user;

		if (isUpdate) {
			food = await Food.findByPk(updateId);
			// create PUT history
			const name = food.name;
			
			await History.create({
				name,
				description: `Menu with id ${food.id} updated`,
				updatedBy: email,
			});
		} else {
			// create POST history
			const name = food.name;

			await History.create({
				name,
				description: `New menu created with id ${food.id}`,
				updatedBy: email,
			});

		}

		res.status(isUpdate ? 200 : 201).json({ food });
	}

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
					attributes: ["password","id"]
				});

				if (!user || !compPass(password, user.password)) {
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
			// 							role: currently only accept Staff
			const [user, created] = await User.findOrCreate({
				where: { email, },
				defaults: { username: name, email, password: "gautpass", role: "Staff" },
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

			// 							role: currently only accept Admin
			const user = await User.create({ username, email, password, role: "Admin", phoneNumber, address });

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

	static async postCategories(req, res, next) {
		try {
			const { name } = req.body;

			const category = await Category.create({ name });

			res.status(201).json({ category });
		} catch (err) {
			next(err);
		}
	}

	static async postFood(req, res, next) {
		try {
			await Controller.modifyOrUpdateFood(req, res);
		} catch (err) {
			next(err);
		}
	}

	static async putFood(req, res, next) {
		try {
			await Controller.modifyOrUpdateFood(req, res, req.params.id);
		} catch (err) {
			next(err);
		}
	}

	static async patchFoodStatus(req, res, next) {
		try {
			const { status } = req.body;

			const id = req.params.id;

			const foodOriginal = await Food.findByPk(id);

			await Food.update({ status }, {
				where: {
					id,
				}
			});
			
			const food = await Food.findByPk(id);

			const name = food.name;
			const { email } = req.user;

			await History.create({
				name,
				description: `Menu status with id ${food.id} has been updated from ${foodOriginal.status} to ${food.status}`,
				updatedBy: email,
			});

			res.status(200).json({ food });
		} catch (err) {
			next(err);
		}
	}

	static async getUsers(req, res, next) {
		try {
			res.status(200).json(await User.findAll({
				attributes: responseUserAttributes(),
			}));
		} catch (err) {
			next(err);
		}
	}

	static async getFood(req, res, next) {
		try {
			res.status(200).json(await Food.findAll({
				include: [
					{
						model: Category,
					},
					{
						model: User,
						attributes: responseUserAttributes()
					}
				]
			}));
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

	static async getUsersFromId(req, res, next) {
		try {
			const data = await User.findOne({
				where: { id: req.params.id },
				attributes: responseUserAttributes(),
			})
			if (!data) {
				throw { name: "Not Found" };
			}
			res.status(200).json(data);
		} catch (err) {
			next(err);
		}
	}

	static async getFoodWithId(req, res, next) {
		try {
			const data = await Food.findOne({
				where: { id: req.params.id },
				include: [
					{
						model: Category,
					},
					{
						model: User,
						attributes: responseUserAttributes()
					}
				]
			});
			if (!data) {
				throw { name: "Not Found" };
			}
			res.status(200).json(data);
		} catch (err) {
			next(err);
		}
	}

	static async getCategoriesWithId(req, res, next) {
		try {
			const data = await Category.findOne({ where: { id: req.params.id }});
			if (!data) {
				throw { name: "Not Found" };
			}
			res.status(200).json(data);
		} catch (err) {
			next(err);
		}
	}

	static async deleteUsersWithId(req, res, next) {
		try {
			// if (req.header["access-token"]) {}
			const data = await User.findOne({ where: { id: req.params.id }})
			if (!data) {
				throw { name: "Not Found" };
			}

			if (!(await data.destroy())) {
				throw { name: "Failed to delete user" };
			}

			res.status(200).json({ message: `${data.username} with id ${data.id} success to delete`, user: data });
		} catch (err) {
			next(err);
		}
	}

	static async deleteFoodWithId(req, res, next) {
		try {
			const data = await Food.findOne({
				where: { id: req.params.id },
			});
			if (!data) {
				throw { name: "Not Found" };
			}

			if (!(await data.destroy())) {
				throw { name: "Failed to delete food" };
			}

			res.status(200).json({ message: `${data.name} with id ${data.id} success to delete`, food: data });
		} catch (err) {
			next(err);
		}
	}

	static async deleteCategoriesWithId(req, res, next) {
		try {
			const data = await Category.findOne({ where: { id: req.params.id }});
			if (!data) {
				throw { name: "Not Found"};
			}

			if (!(await data.destroy())) {
				throw { name: "Failed to delete category" };
			}

			res.status(200).json({ message: `${data.name} with id ${data.id} success to delete`, category: data });
		} catch (err) {
			next(err);
		}
	}

	static async getHistories(req, res, next) {
		try {
			const data = await History.findAll({
				order: [["createdAt", "DESC"]]
			});

			res.status(200).json(data || []);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = Controller;
