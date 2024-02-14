'use strict'

const {model, Schema, Types} = require('mongoose')

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'
const PRODUCT_TYPES = ['Electronics', 'Clothing', 'Furniture']

const productSchema = new Schema({
    product_name: {type: String, required: true},
    product_thumbnail: {type: String, required: true},
    product_description: String,
    product_price: {type: Number, required: true},
    product_quantity: {type: Number, required: true},
    product_type: {type: String, required: true, enum: PRODUCT_TYPES},
    product_shop: String,
    product_attributes: {type: Schema.Types.Mixed, required: true}
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})


// define type product 'clothing'
const clothingSchema = new Schema({
    brand: {type: String, required: true},
    size: String,
    material: String
}, {
    collection: 'clothes',
    timestamps: true
})

// define type product 'electronics'
const electronicSchema = new Schema({
    manufacturer: {type: String, required: true},
    model: String,
    color: String
}, {
    collection: 'electronics',
    timestamps: true
})

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothing: model('Clothing', clothingSchema),
    electronic: model('Electronic', electronicSchema)
}