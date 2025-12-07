// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// export default function authMiddleware(req, res, next) {
//   const authHeader = req.headers.authorization || "";
//   const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
//   if (!token) return res.status(401).json({ message: "No token" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // contains id and email
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// }

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token)
    return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // IMPORTANT — include id and name for comments
    req.user = {
      id: decoded.id,
      name: decoded.name,   // COMMENT FEATURE NEEDS THIS
      email: decoded.email, // optional but helpful
    };

    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
