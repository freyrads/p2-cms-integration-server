"use strict";

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const router = require("./routes/router");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

module.exports = app;
