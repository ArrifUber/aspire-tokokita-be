/**
 * Dashboard Handler
 * Layer ini bertanggung jawab untuk menangani request HTTP dan mengirim response
 */

const dashboardService = require("./service");

const getSummary = async (req, res) => {
  try {
    const summary = await dashboardService.getSummary();
    return res.status(200).json({ success: true, data: summary });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSalesTrend = async (req, res) => {
  try {
    const days = req.query.days ? parseInt(req.query.days) : 7;
    const trend = await dashboardService.getSalesTrend(days);
    return res.status(200).json({ success: true, data: trend });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTopProducts = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const products = await dashboardService.getTopProducts(limit);
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSettlementStatus = async (req, res) => {
  try {
    const status = await dashboardService.getSettlementStatus();
    return res.status(200).json({ success: true, data: status });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRecentTransactions = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const transactions = await dashboardService.getRecentTransactions(limit);
    return res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSalesByCategory = async (req, res) => {
  try {
    const categories = await dashboardService.getSalesByCategory();
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLowStockProducts = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const products = await dashboardService.getLowStockProducts(limit);
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSummary,
  getSalesTrend,
  getTopProducts,
  getSettlementStatus,
  getRecentTransactions,
  getSalesByCategory,
  getLowStockProducts
};