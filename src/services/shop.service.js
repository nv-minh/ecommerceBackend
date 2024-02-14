'use strict';

const shopModel = require('../models/shop.model')

const findByEmail = async ({email, select = {email: 1, password: 2, name: 1, status: 1, roles: 1}}) => {
    return shopModel.findOne({email}).select(select).collation({locale: 'en'}).lean();
}


module.exports = {
    findByEmail
}