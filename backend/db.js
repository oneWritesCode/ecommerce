require("dotenv").config();
const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')

  console.log("Mongodb connected successfully")
  } catch (error) {
    console.log("mongodb connection error : ", error.message)
  }
};

module.exports = ConnectDB;
