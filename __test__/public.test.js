"use strict";

jest.setTimeout(20000);

const request = require("supertest");

const app  = require("../app");
const {sequelize} = require("../models");

let access_token;
let access_token_admin;

beforeAll(async () => {
	// Customer
	// return;
	const res = await request(app)
		.post("/public/register")
		.send({
			email: "test1@mail.com",
			password: "testpassword",
		});

	// tests that needs access token
	access_token = res.body.access_token;

	const resAdmin = await request(app)
		.post("/register")
		.send({
			email: "testAdmin@mail.com",
			password: "testadminpassword",
		});

	access_token_admin = resAdmin.body.access_token;

	// second dummy customer user for seeding
	await request(app)
		.post("/public/register")
		.send({
			email: "test3@mail.com",
			password: "test3password",
		});

	// seed data first
	const users = require("../data/users.json");

	await sequelize.queryInterface.bulkInsert("Users", users.map( el => {
		// if (!el.role) {
		//   el.role = ["Admin", "Staff"][Math.random() > 0.8 ? 0 : 1];
		// }
		el.role = "Admin";
		el.createdAt = el.updatedAt = new Date();

		// el.password = hashPass(el.password);
		return el;
	}));

	const categories = [
		{
		  name: "appetizer"
		},
		{
		  name: "main course"
		},
		{
		  name: "dessert"
		},
	].map( el => {
		el.createdAt = el.updatedAt = new Date();
		return el;
	});

	await sequelize.queryInterface.bulkInsert("Categories", categories);

	const foods = require("../data/foods.json");

	await sequelize.queryInterface.bulkInsert("Food", foods.map( el => {
		el.createdAt = el.updatedAt = new Date();
			return el;
		}));

	const favorites = [
		{
			UserId: 1,
			FoodId: 1,
		},
		{
			UserId: 1,
			FoodId: 3,
		},
		{
			UserId: 1,
			FoodId: 2,
		},
		{
			UserId: 1,
			FoodId: 4,
		},
		{
			UserId: 2,
			FoodId: 7,
		},
		{
			UserId: 2,
			FoodId: 8,
		},
		{
			UserId: 2,
			FoodId: 5,
		},
		{
			UserId: 2,
			FoodId: 6,
		},
	].map(el => {
		el.createdAt = el.updatedAt = new Date();

		return el;
	});

	await sequelize.queryInterface.bulkInsert("FavoriteFoods", favorites);
});

afterAll(async () => {
	// return;
	await sequelize.queryInterface.bulkDelete("Food", {}, {
		truncate: true,
		restartIdentity: true,
		cascade: true,
	});
	await sequelize.queryInterface.bulkDelete("Users", {}, {
		truncate: true,
		restartIdentity: true,
		cascade: true,
	});
	await sequelize.queryInterface.bulkDelete("Categories", {}, {
		truncate: true,
		restartIdentity: true,
		cascade: true,
	});
	await sequelize.queryInterface.bulkDelete("FavoriteFoods", {}, {
		truncate: true,
		restartIdentity: true,
		cascade: true,
	});
});

describe("POST /public/register", () => {
	test("success create user and return 201 status code", async () => {
		const response = await request(app)
			.post("/public/register")
			.send({
				email: "test2@mail.com",
				password: "testpassword",
			});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("access_token", expect.any(String));
		expect(response.body).toHaveProperty("user", expect.any(Object));
	});

	test("failed create user with undefined email and return 400 status code", async () => {
		const response = await request(app)
			.post("/public/register")
			.send({
				password: "testpassword",
			});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors", expect.any(Array));
		expect(response.body.errors[0]).toBe("Email cannot be empty");
	});

	test("failed create user with undefined password and return 400 status code", async () => {
		const response = await request(app)
			.post("/public/register")
			.send({
				email: "test3@mail.com",
			});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors", expect.any(Array));
		expect(response.body.errors[0]).toBe("Password cannot be empty");
	});

	test("failed create user with empty email and return 400 status code", async () => {
		const response = await request(app)
			.post("/public/register")
			.send({
				email: "",
				password: "testpassword",
			});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors", expect.any(Array));
		expect(response.body.errors[0]).toBe("Email must be email format");
	});

	test("failed create user with empty password and return 400 status code", async () => {
		const response = await request(app)
			.post("/public/register")
			.send({
				email: "test4@mail.com",
				password: "",
			});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors", expect.any(Array));
		expect(response.body.errors[0]).toBe("Password must be 5 letter long minimum");
	});

	test("failed create user with invalid email and return 400 status code", async () => {
		const response = await request(app)
			.post("/public/register")
			.send({
				email: "sdkfygkuawsgrfuyawergkearglakeuwrhufg",
				password: "testpassword",
			});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors", expect.any(Array));
		expect(response.body.errors[0]).toBe("Email must be email format");
	});

	test("failed create user with email that already exist and return 400 status code", async () => {
		const response = await request(app)
			.post("/public/register")
			.send({
				email: "test1@mail.com",
				password: "testpassword",
			});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors", expect.any(Array));
		expect(response.body.errors[0]).toBe("This email is already registered");
	});
});

describe("POST /public/login", () => {
	test("success login and return 200 status code", async () => {
		const response = await request(app)
			.post("/public/login")
			.send({
				email: "test1@mail.com",
				password: "testpassword",
			});


		// console.log(response.body, "<<<<<<<<<<<<<<<<<<<<<<");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("access_token", expect.any(String));
		expect(response.body).toHaveProperty("user", expect.any(Object));
	});

	test("failed login with wrong password and return 401 status code", async () => {
		const response = await request(app)
			.post("/public/login")
			.send({
				email: "test1@mail.com",
				password: "sdhgflsg",
			});

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Invalid username or password");
	});

	test("failed login with unregistered email and return 401 status code", async () => {
		const response = await request(app)
			.post("/public/login")
			.send({
				email: "Hello@Wrong.com",
				password: "testpassword",
			});

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Invalid username or password");
	});
});

describe("GET /public/food", () => {
	test("success get all food and return 200 status code", async () => {
		const response = await request(app)
			.get("/public/food");

		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.any(Array));

		if (response.body.length) {
			response.body.forEach(food => {
				expect(food).toEqual(expect.any(Object));
				expect(food).toHaveProperty("Category", expect.any(Object));
				expect(food.User).toBe(undefined);
			});
		}
	});

	test("success get all food with filter and return 200 status code", async () => {
		const response = await request(app)
			.get("/public/food?search=cake");

		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.any(Array));

		if (response.body.length) {
			response.body.forEach(food => {
				expect(food).toEqual(expect.any(Object));
				expect(!!food.name.match(/cake/ig).length).toBe(true);
				expect(food).toHaveProperty("Category", expect.any(Object));
				expect(food.User).toBe(undefined);
			});
		}
	});

	test("success get all food with pagination and return 200 status code", async () => {
		// !TEST
		const response1 = await request(app)
			.get("/public/food?page=0");

		expect(response1.status).toBe(200);
		expect(response1.body).toEqual(expect.any(Array));

		expect(response1.body.length).toBe(9);
		response1.body.forEach(food => {
			expect(food).toEqual(expect.any(Object));
			expect(food).toHaveProperty("Category", expect.any(Object));
			expect(food.User).toBe(undefined);
		});

		const response2 = await request(app)
			.get("/public/food?page=1");

		expect(response2.status).toBe(200);
		expect(response2.body).toEqual(expect.any(Array));

		expect(response2.body.length).toBe(4);
		response2.body.forEach(food => {
			expect(food).toEqual(expect.any(Object));
			expect(food).toHaveProperty("Category", expect.any(Object));
			expect(food.User).toBe(undefined);
		});
	});

	test("failed get one food without access token and return 200 status code", async () => {
		// !TEST
		const response = await request(app)
			.get("/public/food/1");

		expect(response.status).toBe(401);
		expect(response.body).toEqual(expect.any(Object));
		expect(response.body).toHaveProperty("error", "Invalid token");
	});

	test("success get one food with access token and return 200 status code", async () => {
		// !TEST
		const response = await request(app)
			.get("/public/food/1")
			.set("access_token", access_token);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.any(Object));
		expect(response.body).toHaveProperty("Category", expect.any(Object));
		expect(response.body.User).toBe(undefined);
		expect(response.body.name).toBe("Wine - Fontanafredda Barolo");
		expect(response.body.Category.name).toBe("appetizer");
	});

	test("failed get one food that doesn't exist in database and return 200 status code", async () => {
		// !TEST
		const response = await request(app)
			.get("/public/food/123")
			.set("access_token", access_token);

		expect(response.status).toBe(404);
		expect(response.body).toEqual(expect.any(Object));
		expect(response.body).toHaveProperty("error", "Not Found");
	});
});

describe("GET /public/favorites", () => {
	it("success get favorite food list of the user logged in and return 200 status code", async () => {
		const response = await request(app)
			.get("/public/favorites")
			.set("access_token", access_token);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.any(Array));

		expect(response.body.length).toBe(4);
		
		response.body.forEach(fav => {
			expect(fav).toEqual(expect.any(Object));
			expect(fav.Food).toEqual(expect.any(Object));
			expect(fav.User).toEqual(expect.any(Object));
			expect(fav.User.id).toBe(1);
			expect(fav.User.email).toBe("test1@mail.com");
		});
	});

	it("success add new favorite food and return 201 status code", async () => {
		const response = await request(app)
			.post("/public/favorites")
			.set("access_token", access_token)
			.send({
				// food id
				id: 10,
			});

		expect(response.status).toBe(201);
		expect(response.body).toEqual(expect.any(Object));

		expect(response.body.id).toBe(9);
		expect(response.body.UserId).toBe(1);
		expect(response.body.FoodId).toBe(10);
	});

	it("failed add new favorite food with food id that doesn't exist and return 404 status code", async () => {
		const response = await request(app)
			.post("/public/favorites")
			.set("access_token", access_token)
			.send({
				// food id
				id: 69,
			});

		expect(response.status).toBe(404);
		expect(response.body).toEqual(expect.any(Object));

		expect(response.body.error).toBe("Food not found");
	});

	it("failed get favorite food list without access token and return 401 status code", async () => {
		const response = await request(app)
			.get("/public/favorites");

		expect(response.status).toBe(401);
		expect(response.body).toEqual(expect.any(Object));

		expect(response.body.error).toBe("Invalid token");
	});

	it("failed get favorite food list of the user with role staff or admin and return 401 status code", async () => {
		// const responseStaff = await request(app)
		// 	.get("/public/favorites")
		// 	.set("access_token", access_token_staff);

		// expect(responseStaff.status).toBe(401);
		// expect(responseStaff.body).toEqual(expect.any(Object));

		// expect(responseStaff.body.error).toBe("Public endpoint can only be accessed by customer");

		const responseAdmin = await request(app)
			.get("/public/favorites")
			.set("access_token", access_token_admin);

		expect(responseAdmin.status).toBe(401);
		expect(responseAdmin.body).toEqual(expect.any(Object));

		expect(responseAdmin.body.error).toBe("Public endpoint can only be accessed by customer");
	});
});
