const express = require("express");
const app = express();
const morgan = require("morgan");
const compression = require("compression");
const { default: helmet } = require("helmet");
require("dotenv").config();
// init Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// init db
require("./db/init.mongodb");
const { countConnect, checkOverload } = require("./helpers/check.connect");
countConnect();
// checkOverload();
// init routes

// handling error

module.exports = app;
