"use strict";

const AccessService = require("../services/access.service");
const { OK, CREATED, SuccessResponse} = require("../core/success.response");
class AccessController {

  logout = async (req, res,next)=>{
    new SuccessResponse({
      message:'Logout success!',
      metadata: await AccessService.logout(req.keyStore)
    }).send(res)
  }

  login = async (req,res,next)=>{
     new SuccessResponse({
      metadata: await AccessService.login((req.body))
    }).send(res)
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
