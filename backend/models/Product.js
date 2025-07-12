const { Schema, model } = require("mongoose")

const productSchema = Schema({
    // Seller Information
    sellerName: {
        type: String,
        required: true
    },
    sellerEmail: {
        type: String,
        required: true
    },
    sellerPassword: {
        type: String,
        required: true
    },
    sellerAddress: {
        type: String,
        required: true
    },
    sellerPhone: {
        type: String,
        required: true
    },
    
    // Product Information
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    productImages: [{
        type: String,
        required: true
    }],
    
    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model("Product", productSchema);