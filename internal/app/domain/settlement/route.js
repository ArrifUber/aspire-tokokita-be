/**
 * Settlement Routes
 * Layer ini mendefinisikan endpoint API untuk module settlement
 */

const express = require("express");
const router = express.Router();
const settlementHandler = require("./handler");
const JWTMiddleware = require("../../../pkg/middleware/jwt");

// Apply JWT Middleware to all routes in this module
router.use(JWTMiddleware);

// Endpoint: [GET] /settlements/preview
// Deskripsi: Hitung preview settlement tanpa menyimpan data
router.get("/preview", settlementHandler.preview);

// Endpoint: [GET] /settlements
// Deskripsi: Mengambil semua daftar settlement
router.get("/", settlementHandler.getAll);

// Endpoint: [GET] /settlements/:id
// Deskripsi: Mengambil detail satu settlement berdasarkan ID
router.get("/:id", settlementHandler.getById);

// Endpoint: [POST] /settlements
// Deskripsi: Membuat settlement baru dari transaksi yang belum di-settle
router.post("/", settlementHandler.create);

// Endpoint: [PATCH] /settlements/:id/pay
// Deskripsi: Menandai settlement sebagai lunas
router.patch("/:id/pay", settlementHandler.pay);

module.exports = router;