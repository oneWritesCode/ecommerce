const mongoose = require("mongoose");
const { Router } = require("express");
const multer = require("multer");
const Product = require("../models/Product");

const router = Router();

//setup of images from multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

//add product route
router.post(
  "/add-product",
  upload.array("productImages", 10),
  async (req, res) => {
    try {
      // Extract data from request body
      const {
        name,
        email,
        password,
        address,
        phone,
        productName,
        productDescription,
        productPrice,
        productCategory,
        productQuantity,
      } = req.body;

      // Get uploaded image paths
      const productImages = req.files
        ? req.files.map((file) => `/uploads/${file.filename}`)
        : [];

      // Create new product
      const newProduct = new Product({
        sellerName: name,
        sellerEmail: email,
        sellerPassword: password,
        sellerAddress: address,
        sellerPhone: phone,
        productName,
        productDescription,
        productPrice: parseFloat(productPrice),
        productCategory,
        productQuantity: parseInt(productQuantity),
        productImages,
      });

      // Save to database
      const savedProduct = await newProduct.save();

      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: savedProduct,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({
        success: false,
        message: "Failed to add product",
        error: error.message,
      });
    }
  }
);

// Update product route
router.put("/edit-product/:id", upload.array("productImages", 10), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
      phone,
      productName,
      productDescription,
      productPrice,
      productCategory,
      productQuantity
    } = req.body;

    // Find the product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Handle images
    let productImages = product.productImages;
    if (req.files && req.files.length > 0) {
      productImages = req.files.map((file) => `/uploads/${file.filename}`);
    }

    // Update fields
    product.sellerName = name;
    product.sellerAddress = address;
    product.sellerPhone = phone;
    product.productName = productName;
    product.productDescription = productDescription;
    product.productPrice = parseFloat(productPrice);
    product.productCategory = productCategory;
    product.productQuantity = parseInt(productQuantity);
    product.productImages = productImages;
    product.updatedAt = Date.now();

    await product.save();

    res.status(200).json({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update product", error: error.message });
  }
});

// Buy product route
router.post("/buy-product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      buyerName,
      buyerEmail,
      buyerAddress,
      buyerPhone,
      quantityPurchased
    } = req.body;

    // Find the product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    // Check if product has enough quantity
    if (product.productQuantity < quantityPurchased) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.productQuantity} items available. You requested ${quantityPurchased}.`
      });
    }

    // Check if quantity is valid
    if (quantityPurchased <= 0) {
      return res.status(400).json({
        success: false,
        message: "sold out"
      });
    }

    // Create buyer information object
    const buyerInfo = {
      buyerName,
      buyerEmail,
      buyerAddress,
      buyerPhone,
      quantityPurchased,
      purchaseDate: new Date(),
      IsSold: false
    };

    // Add buyer to product's buyersInformation array
    product.buyersInformation.push(buyerInfo);

    // Update product quantity
    product.productQuantity = product.productQuantity - quantityPurchased;

    // Update the product
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product purchased successfully!",
      product: product,
      buyerInfo: buyerInfo
    });

  } catch (error) {
    console.error("Error purchasing product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to purchase product",
      error: error.message
    });
  }
});






// fetch api's_____________________________________________________________________________________________
router.get("/all-products", async (req, res) => {
  const product = await Product.find({});
  res.json(product);
});

// Get a single product by ID
router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch product",
        error: error.message,
      });
  }
});

module.exports = router;
