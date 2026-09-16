const express = require("express");
const router = express.Router();

const companyRoutes = require("../domain/company/routes");
const productRoutes = require("../domain/product/routes");
const transactionRoutes = require("../domain/transaction/routes");
const userRoutes = require("../domain/user/routes");
const categoryRoutes = require("../domain/category/routes");
const fileRoutes = require("../domain/file/routes");
const reportRoutes = require("../domain/report/routes");
const chatbotRoutes = require("../domain/chatbot/routes");
const vendorRoutes = require("../domain/vendor/routes");
const settlementRoutes = require("../domain/settlement/route")
const dashboardRoute = require("../domain/dashboard/route");

// Daftarkan route domain ke path yang sesuai
router.use("/companies", companyRoutes);
router.use("/products", productRoutes);
router.use("/transactions", transactionRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/files", fileRoutes);
router.use("/reports", reportRoutes);
router.use("/chatbot", chatbotRoutes);
router.use("/vendor", vendorRoutes)
router.use("/settlements", settlementRoutes)
router.use("/dashboard", dashboardRoute)

module.exports = router;