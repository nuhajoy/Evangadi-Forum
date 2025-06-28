const { StatusCodes } = require("http-status-codes");
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // 🔒 Check if Authorization header is present and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("No valid Authorization header.");
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Authentication invalid — token missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ✅ Verify JWT and extract user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.user_name || !decoded?.user_id) {
      console.warn("Token decoded but missing user data:", decoded);
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Authentication invalid — incomplete token payload",
      });
    }

    req.user = {
      user_name: decoded.user_name,
      user_id: decoded.user_id,
    };

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Authentication invalid — token rejected",
    });
  }
}

module.exports = authMiddleware;
