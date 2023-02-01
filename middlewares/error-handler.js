"use strict";

const errorHandler = (err, req, res, next) => {
	console.error(err);
	if (["Unauthorized", "Invalid username or password", "Public endpoint can only be accessed by customer"].includes(err.name)) {
		return res.status(401).json({
			error: err.name,
		});
	}
	else if (["JsonWebTokenError", "Invalid token"].includes(err.name)) {
		return res.status(401).json({
			error: "Invalid token",
		});
	}
	else if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(err.name)) {
		res.status(400).json({ errors: err.errors.map(el => el.message) });
		return;
	}
	else if ([
		"Favorite not found",
		"Food not found",
		"User not found",
	].includes(err.name)) {
		return res.status(404).json({
			error: err.name,
		});
	}
	else if ([
		"This menu is already in your favorite list"
	].includes(err.name)) {
		return res.status(400).json({
			error: err.name,
		});
	}
	else if (err.name === "Forbidden") {
		return res.status(403).json({
			error: err.name,
		});
	}
	else if (err.name === "SequelizeForeignKeyConstraintError") {
		return res.status(400).json({ errors: [
		  `Can't delete ${err.table.toLowerCase()} while still referenced by ${err.original.table.toLowerCase()}`,
		]});
	}
	else if ([
		"Failed to create user",
		"Failed to delete category",
		"Failed to delete user",
		"Failed to delete food"
	].includes(err.name)) {
		return res.status(500).json({ error: err.name });
	}
	else if (err.name === "Not Found") {
		return res.status(404).json({ error: "Not Found" });
	}

	console.error("[STATUS] 500");
	res.status(500).json({
		error: "Internal Server Error",
	});
}

module.exports = {
	errorHandler,
}
