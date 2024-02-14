'use strict';

const shopModel = require('../models/shop.model')

const findByEmail = async ({email, select = {email: 1, password: 2, name: 1, status: 1, roles: 1}}) => {
    console.log("email",email)
    return shopModel.findOne({email}).select(select).lean();
}


module.exports = {
    findByEmail
}