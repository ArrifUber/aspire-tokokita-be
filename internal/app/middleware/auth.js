/**
 * JWT Middleware
 * Digunakan untuk memproteksi endpoint yang membutuhkan autentikasi
 */

const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../../.env") });

const secretKey = process.env.JWT_SECRET || "your-default-secret-key";

/**
 * JWT Middleware
 * Digunakan untuk memproteksi endpoint yang membutuhkan autentikasi
 */
const authFactory = (allowedRoles = []) => {
  return (req, res, next) => {
    // 1. Ambil token dari header Authorization
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <token>"

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied, token missing",
      });
    }

    try {
      // 2. Verifikasi token
      const decoded = jwt.verify(token, secretKey);

      // 3. RBAC Check
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You do not have the required role",
        });
      }

      // 4. Simpan data user ke dalam request object
      req.user = decoded;

      next();
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

const authMiddleware = (req, res, next) => {
    // If called as middleware (req, res, next exist)
    if (req && res && typeof next === 'function') {
        return authFactory([])(req, res, next);
    }
    // If called as factory (allowedRoles is passed as first arg)
    return authFactory(req);
};

module.exports = authMiddleware;
