"use strict";

const { hashSync, genSaltSync, compareSync } = require("bcryptjs");

/**
 * @param {string} pass
 * @returns {string} Hashed password
 */
const hashPass = (pass) => {
	return hashSync(pass, genSaltSync(13));
}

/**
 * @param {string} pass
 * @param {string} hashedPass
 * @returns {boolean} True if match, else false
 */
const compPass = (pass, hashedPass) => {
	return compareSync(pass, hashedPass);
}

module.exports = {
	hashPass,
	compPass,
}
