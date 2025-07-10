require("dotenv").config();

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "something-shitty-called-EcommmerceWebApplication";

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    req.user = decoded.userId || decoded._id;
    next();
  } catch (err) {

    console.error("JWT verification error:", err.message);
    res.json({ error: "Token is not valid" });
  }
}

module.exports = authMiddleware;
