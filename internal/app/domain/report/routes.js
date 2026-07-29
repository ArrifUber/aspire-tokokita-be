const express = require("express");
const router = express.Router();
const handler = require("./handler");
const authMiddleware = require("../../middleware/auth");
const { ADMIN, MANAGER, USER } = require("../../../pkg/constants/roles");

router.get("/sales", authMiddleware([ADMIN, MANAGER, USER]), handler.getSalesReport);
router.get("/analytics", authMiddleware([ADMIN, MANAGER, USER]), handler.getAnalytics);
router.get("/expenses", authMiddleware([ADMIN, MANAGER, USER]), handler.getExpensesReport);
router.get("/profit", authMiddleware([ADMIN, MANAGER, USER]), handler.getProfitReport);
router.get("/export", authMiddleware([ADMIN, MANAGER, USER]), handler.exportReport);

module.exports = router;
