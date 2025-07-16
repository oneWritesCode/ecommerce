const express = require("express");
const cors = require("cors");
const path = require("path");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const pool = require("./db");
const ConnectDB = require("./db");
const cookieParser = require("cookie-parser")
const app = express();

ConnectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Serve static files from public/uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use("/user", userRouter);
app.use("/api", productRouter);
app.use("/cart", cartRouter);

app.get('/', (req, res) => {
  res.json({ message: "available get routes : /api/all-products" })
})




app.listen(8000, () => {
  console.log("server connected succesfully");
});
