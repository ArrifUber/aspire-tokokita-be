/**
 * Settlement Handler
 * Layer ini bertanggung jawab untuk menangani request HTTP dan mengirim response
 */

const settlementService = require("./service");
const { CreateSettlementRequest } = require("./dto");

const preview = async (req, res) => {
  try {
    const { vendorId, periodStart, periodEnd } = req.query;

    if (!vendorId || !periodStart || !periodEnd) {
      return res.status(400).json({
        success: false,
        message: "vendorId, periodStart, dan periodEnd wajib diisi",
      });
    }

    const preview = await settlementService.previewSettlement(
      vendorId,
      periodStart,
      periodEnd,
    );
    return res.status(200).json({
      success: true,
      data: preview,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const settlements = await settlementService.getAllSettlements();
    return res.status(200).json({
      success: true,
      data: settlements,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const settlement = await settlementService.getSettlementById(id);
    return res.status(200).json({
      success: true,
      data: settlement,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const settlementData = CreateSettlementRequest(req.body);
    const newSettlement = await settlementService.createSettlement(settlementData);
    return res.status(201).json({
      success: true,
      message: "Settlement created successfully",
      data: newSettlement,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const pay = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSettlement = await settlementService.markSettlementAsPaid(id);
    return res.status(200).json({
      success: true,
      message: "Settlement marked as paid",
      data: updatedSettlement,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  preview,
  getAll,
  getById,
  create,
  pay,
};