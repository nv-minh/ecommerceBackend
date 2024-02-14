"use strict";
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const {createTokenPair} = require("../auth/authUtils");
const {getInfoData} = require("../utils");
const {BadRequestError, AuthFailureError} = require("../core/error.response");
const {findByEmail} = require("./shop.service");

const Role = {
    SHOP: "SHOP", WRITER: "WRITER", EDITOR: "EDITOR", ADMIN: "ADMIN",
};

class AccessService {

    /*
    * 1 - check email in dbs
    * 2 - match password
    * 3 - create AT vs RT and save
    * 4 - generate tokens
    * 5 - get data return login
    * */
    // TODO handle case multiple devices
    static login = async ({email, password, refreshToken = null}) => {
        const foundShop = await findByEmail({email})
        if (!foundShop) throw new BadRequestError('Shop not registered')


        const match = await bcrypt.compare(password, foundShop.password)

        if (!match) throw new AuthFailureError('Password mismatch')

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const tokens = await createTokenPair({userId: foundShop._id, email}, publicKey, privateKey)

        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey
        })
        return {
            metadata: {
                shop: getInfoData({fields: ['_id', 'name', 'email'], object: foundShop}), tokens
            }
        }
    }

    static signUp = async ({name, email, password}) => {
        // check email exits
        const holderShop = await findByEmail({email})
        if (holderShop) {
            throw new BadRequestError("Error: Shop already registered");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newShop = await shopModel.create({
            name, email, password: passwordHash, roles: [Role.SHOP],
        });

        if (newShop) {
            const privateKey = crypto.randomBytes(64).toString();
            const publicKey = crypto.randomBytes(64).toString();
            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id, publicKey, privateKey
            });
            if (!keyStore) {
                return {
                    code: "xxxx", message: "publicKeyString error",
                };
            }
            // created token pair
            const tokens = await createTokenPair({
                userId: newShop._id, email,
            }, publicKey, privateKey);
            return {
                code: "201", metadata: {
                    shop: getInfoData({
                        object: newShop, fields: ["_id", "name", "email"],
                    }), tokens,
                },
            };
        }
        return {
            code: "201", metadata: null,
        };
    };
}

module.exports = AccessService;
