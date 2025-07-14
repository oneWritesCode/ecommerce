const { Schema, model } = require("mongoose");

const cartItemSchema = Schema({
  // Product Details (stored directly)
  productId: {
    type: String,
    required: true,
  },
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
  productImages: [
    {
      type: String,
      required: true,
    },
  ],

  // Seller Information
  sellerName: {
    type: String,
    required: true,
  },
  sellerEmail: {
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

  // Cart Item Specific
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const cartSchema = Schema({
  // User Information (stored directly)
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },

  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
cartSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = model("Cart", cartSchema);
