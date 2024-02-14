"use strict";
const mongoose = require("mongoose"); // Erase if already required
const {model, Schema, Types} = require("mongoose");

const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

// Declare the Schema of the Mongo model
let keyTokenSchema = new mongoose.Schema(
    {
        name: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "Shop",
        },
        publicKey: {
            type: String,
            require: true,
        },
        privateKey: {
            type: String,
            require: true,
        },
        refreshTokensUsed: {
            type: Array,
            default: [],
        },
        refreshToken: {type: String, require: true}
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);
