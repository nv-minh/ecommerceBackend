"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const publicKeyString = publicKey.toString();
      const privateKeyString = privateKey.toString();
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
        privateKey: privateKeyString,
      });
      return tokens ? publicKeyString : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
