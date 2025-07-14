const mongoose = require("mongoose");
const { Router } = require("express");
const Cart = require("../models/Cart");

const router = Router();

// Add to cart
router.post("/addToCart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      userName,
      userEmail,
      userAddress,
      userPhone,
      productId,
      productName,
      productDescription,
      productPrice,
      productCategory,
      productQuantity,
      productImages,
      sellerName,
      sellerEmail,
      sellerAddress,
      sellerPhone,
      quantity,
    } = req.body;

    // Validate required fields
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    // Check if product has enough stock
    if (productQuantity < quantity) {
      return res.status(400).json({ error: "Insufficient stock available" });
    }

    // Find or create user's cart
    let cart = await Cart.findOne({ userId: userId });

    if (cart) {
      res.status(400).json({ error: "Already added " });
    }

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new Cart({
        userId,
        userName,
        userEmail,
        userAddress,
        userPhone,
        items: [],
      });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity if product already in cart
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        productId,
        productName,
        productDescription,
        productPrice,
        productCategory,
        productQuantity,
        productImages,
        sellerName,
        sellerEmail,
        sellerAddress,
        sellerPhone,
        quantity,
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Product added to cart successfully",
      cart: cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user's cart
router.get("/getCart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        cart: { items: [] },
      });
    }

    res.status(200).json({
      cart: cart,
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update cart item quantity
// router.put('/updateQuantity/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { productId, quantity } = req.body;

//     if (!productId || quantity === undefined) {
//       return res.status(400).json({ error: "Product ID and quantity are required" });
//     }

//     if (quantity < 1) {
//       return res.status(400).json({ error: "Quantity must be at least 1" });
//     }

//     const cart = await Cart.findOne({ userId: userId });
//     if (!cart) {
//       return res.status(404).json({ error: "Cart not found" });
//     }

//     const itemIndex = cart.items.findIndex(
//       item => item.productId === productId
//     );

//     if (itemIndex === -1) {
//       return res.status(404).json({ error: "Product not found in cart" });
//     }

//     // Check if product has enough stock
//     if (cart.items[itemIndex].productQuantity < quantity) {
//       return res.status(400).json({ error: "Insufficient stock available" });
//     }

//     cart.items[itemIndex].quantity = quantity;
//     await cart.save();

//     res.status(200).json({
//       message: "Quantity updated successfully",
//       cart: cart
//     });

//   } catch (error) {
//     console.error("Update quantity error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Remove item from cart
router.delete("/removeItem/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({
      message: "Item removed from cart successfully",
      cart: cart,
    });
  } catch (error) {
    console.error("Remove item error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Clear entire cart
// router.delete('/clearCart/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const cart = await Cart.findOne({ userId: userId });
//     if (!cart) {
//       return res.status(404).json({ error: "Cart not found" });
//     }

//     cart.items = [];
//     await cart.save();

//     res.status(200).json({
//       message: "Cart cleared successfully",
//       cart: cart
//     });

//   } catch (error) {
//     console.error("Clear cart error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = router;
