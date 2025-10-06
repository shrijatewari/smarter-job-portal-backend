// src/middleware/auth.js
import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const header = req.headers.authorization;
  
  if (!header) {
    console.log("❌ Auth middleware: No authorization header");
    return res.status(401).json({ message: "No authorization header" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    console.log("❌ Auth middleware: Missing token");
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret-key");
    req.user = decoded; // { id: ... }
    console.log("✅ Auth middleware: Valid token for user:", decoded.id);
    next();
  } catch (err) {
    console.log("❌ Auth middleware: Invalid token:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
