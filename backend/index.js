const express = require("express");
const cors = require("cors");
const userrouter = require("./routes/user");
const pool = require("./db");
const ConnectDB = require("./db");
const cookieParser = require("cookie-parser")
const app = express();

ConnectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true, // allow cookies to be sent
}));

app.use("/user", userrouter);

app.get("/", (req, res) => {
  res.redirect("/api/hello");
});

app.get("/api/hello", (req, res) => {
  res.json("delhi k londo ki budhi garaaam");
});

app.listen(8000, () => {
  console.log("server connected succesfully");
});
