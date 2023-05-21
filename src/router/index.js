"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();

router.use("/v1/api", require("./access"));
// check apiKey
router.use(apiKey);
// check permissions
router.use(permission("0000"));

module.exports = router;
