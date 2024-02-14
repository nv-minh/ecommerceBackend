"use strict";

const AccessService = require("../services/access.service");
const { OK, CREATED, SuccessResponse} = require("../core/success.response");
class AccessController {
  login = async (req,res,next)=>{
    new SuccessResponse({
      metadata: await AccessService.login((req.body))
    })
  }
  signUp = async (req, res, next) => {
    try {
      const metadata = await AccessService.signUp(req.query);
      new CREATED({
        message: "Registered OK!",
        metadata: metadata,
      }).send(res);
    } catch (error) {
      next(error); // Chuyển ngoại lệ cho xử lý lỗi tiếp theo
    }
  };
}

module.exports = new AccessController();
