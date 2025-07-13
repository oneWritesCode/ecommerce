const { Schema, model } = require("mongoose");

const productSchema = Schema({
  // Seller Information
  sellerName: {
    type: String,
    required: true,
  },
  sellerEmail: {
    type: String,
    required: true,
  },
  sellerPassword: {
    type: String,
    required: true,
  },
  sellerAddress: {
    type: String,
    required: true,
  },
  sellerPhone: {
    type: String,
    required: true,
  },

  // Product Information
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productImages: [
    {
      type: String,
      required: true,
    },
  ],

  // Buyers Information
  buyersInformation: [
    {
      buyerName: {
        type: String,
        required: true,
      },
      buyerEmail: {
        type: String,
        required: true,
      },
      buyerAddress: {
        type: String,
        required: true,
      },
      buyerPhone: {
        type: String,
        required: true,
      },
      purchaseDate: {
        type: Date,
        default: Date.now,
      },
      quantityPurchased: {
        type: Number,
        required: true,
        min: 1,
      },
      IsSold: {
        type: Boolean,
        default: false,
      },
    },
  ],

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Product", productSchema);
