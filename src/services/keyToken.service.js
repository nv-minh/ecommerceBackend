"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
    static createKeyToken = async ({userId, publicKey, privateKey, refreshToken}) => {
        try {
            // const publicKeyString = publicKey.toString();
            // const privateKeyString = privateKey.toString();
            // const tokens = await keyTokenModel.create({
            //   user: userId,
            //   publicKey: publicKeyString,
            //   privateKey: privateKeyString,
            // });
            // return tokens ? publicKeyString : null;

            const filter = {user: userId}
            const update = {publicKey, privateKey, refreshTokenUsed: [], refreshToken}
            const options = {upsert: true, new: true}
            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)
            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error;
        }
    };
}

module.exports = KeyTokenService;
