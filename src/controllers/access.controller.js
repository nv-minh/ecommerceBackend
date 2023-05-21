"use strict";

const AccessService = require("../services/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log(`[P]:::signUp:`, req.query);
      return res.status(201).json(await AccessService.signUp(req.query));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
