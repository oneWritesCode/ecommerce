require("dotenv").config();
const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
  await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  console.log("Mongodb connected successfully")
  } catch (error) {
    console.log("mongodb connection error : ", error.message)
  }
};

module.exports = ConnectDB;
