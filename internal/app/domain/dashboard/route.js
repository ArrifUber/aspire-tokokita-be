/**
 * Dashboard Routes
 * Layer ini mendefinisikan endpoint API untuk module dashboard
 */

const express = require("express");
const router = express.Router();
const dashboardHandler = require("./handler");
const JWTMiddleware = require("../../../pkg/middleware/jwt");

router.use(JWTMiddleware);

// Endpoint: [GET] /dashboard/summary
// Deskripsi: Ringkasan badge (omzet, komisi, belum dibayar vendor, dst)
router.get("/summary", dashboardHandler.getSummary);

// Endpoint: [GET] /dashboard/sales-trend?days=7
// Deskripsi: Tren penjualan per hari dalam N hari terakhir
router.get("/sales-trend", dashboardHandler.getSalesTrend);

// Endpoint: [GET] /dashboard/top-products?limit=5
// Deskripsi: Produk terlaris berdasarkan quantity terjual
router.get("/top-products", dashboardHandler.getTopProducts);

// Endpoint: [GET] /dashboard/settlement-status
// Deskripsi: Ringkasan jumlah settlement per status
router.get("/settlement-status", dashboardHandler.getSettlementStatus);

// Endpoint: [GET] /dashboard/recent-transactions?limit=5
// Deskripsi: Daftar transaksi terbaru
router.get("/recent-transactions", dashboardHandler.getRecentTransactions);

// Endpoint: [GET] /dashboard/sales-by-category
router.get("/sales-by-category", dashboardHandler.getSalesByCategory);

// Endpoint: [GET] /dashboard/low-stock?limit=5
router.get("/low-stock", dashboardHandler.getLowStockProducts);

module.exports = router;