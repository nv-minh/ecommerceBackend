"use strict";

const express = require("express");
const router = express.Router();
const accessController = require("../../controllers/access.controller");
const {asyncHandler} = require("../../helpers/asyncHandler");
// signUp
router.post("/shop/signUp", asyncHandler(accessController.signUp));
router.post("/shop/login", asyncHandler(accessController.login));
router.post("/shop/logout", asyncHandler(accessController.logout));


// Authentication


module.exports = router;
