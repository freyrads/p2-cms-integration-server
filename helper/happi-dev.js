"use strict";

const axios = require("axios");
const { HAPPI_DEV_APIKEY } = process.env;

/**
 * @typedef {object} QRCodeAPIReturnType
 * @property {boolean} success
 * @property {string} qrcode
 * @property {string} error
 * @property {{width:number,height:number}} size
 */

/**
 * @param {string} url
 * @throws TypeError on undefined or empty url
 * @returns {Promise<QRCodeAPIReturnType>}
 */
const generateQRCode = async (url) => {
	if (!url?.length) throw new TypeError("Expected url string with length > 0, got '" + url + "'");

	const res = await axios.get("https://api.happi.dev/v1/qrcode", {
		headers: {
			"x-happi-key": HAPPI_DEV_APIKEY,
			"Accept-Encoding": "application/json",
		},
		params: {
			data: encodeURIComponent(url),
		},
	});

	return res.data;
}

// generateQRCode("sajfhgkssguhsg").then(console.log);

module.exports = {
	generateQRCode,
}
