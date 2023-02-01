"use strict";

const { sign, verify } = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

/**
 * @param {string | object | Buffer} payload
 * @returns {string} Created token
 */
const createToken = (payload) => {
	return sign(payload, JWT_SECRET);
}

/**
 * @param {string} token
 * @returns {object} Decoded payload
 * @throws
 */
const verifyToken = (token) => {
	return verify(token, JWT_SECRET);
}

module.exports = {
	createToken,
	verifyToken,
}
