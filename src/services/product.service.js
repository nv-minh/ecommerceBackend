'use strict';

const {electronic, clothing, product} = require('../models/product.model')
const {BadRequestError} = require('../core/error.response')

// define Factory class to create product

class ProductFactory {
    static async createProduct(type, payload) {
        switch (type) {
            case 'Electronics':
                return new Electronics(payload)
            case 'Clothing':
                return new Clothing(payload)
            default:
                throw new BadRequestError(`Invalid Product types ${type}`)
        }
    }
}


// define base product class
class Product {
    constructor({
                    product_name,
                    product_thumbnail,
                    product_description,
                    product_price,
                    product_quantity,
                    product_type,
                    product_shop,
                    product_attributes
                }) {
        this.product_name = product_name
        this.product_thumbnail = product_thumbnail
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
    }

    //create new product
    async createProduct() {
        return await product.create(this)
    }
}


// Define subclass for different product types clothing
class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create(this.product_attributes)
        if (!newClothing) throw new BadRequestError('Create new clothing error')

        const newProduct = await super.createProduct()
        if (!newProduct) throw new BadRequestError('Create new product error')
        return newProduct
    }
}


// Define sub-class for different product types electronics
class Electronics extends Product {
    async createProduct() {
        const newElectronics = await electronic.create(this.product_attributes)
        if (!newElectronics) throw new BadRequestError('Create new electronics error')

        const newProduct = await super.createProduct()
        if (!newProduct) throw new BadRequestError('Create new product error')
        return newProduct
    }
}


module.exports = ProductFactory