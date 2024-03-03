"use strict";
const JWT = require("jsonwebtoken");
const {asyncHandler} = require("../helpers/asyncHandler");
const {HEADER} = require("../utils/constrant");
const {AuthFailureError,NotFoundError} = require("../core/error.response");

const {findByUserId} = require('../services/keyToken.service')
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // accessToken
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: "2 days",
        });
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: "7 days",
        });

        JWT.verify(accessToken, publicKey, (error, decode) => {
            if (error) {
                console.error(`error verify::`, error);
            } else {
                console.log(`decode verify::`, decode);
            }
        });
        return {accessToken, refreshToken};
    } catch (error) {
        return error;
    }
};


const authentication = asyncHandler(async (req, res, next) => {
    /*
    * 1 - check userId missing
    * 2 - get accessToken
    * 3 - verifyToken
    * 4 - check user in bds
    * 5 - check keyStore with this userId
    * 6 - return next
    * */

    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) throw new AuthFailureError("Missing userId")

    const keyStore = await findByUserId(userId)
    if(!keyStore) return throw new NotFoundError('Not found keyStore')

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invalid request')

    try {
        const decodeUser = JWT.verify(accessToken,keyStore.publicKey)
        if(userId !== decodeUser.userId) throw new AuthFailureError('Invalid userId')
        req.keyStore = keyStore
        return next()
    }catch (e) {
        throw e
    }
})

module.exports = {
    createTokenPair,
    authentication
};
