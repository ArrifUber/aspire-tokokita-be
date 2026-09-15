/**
 * Settlement Service
 */

const settlementRepository = require("./repository");
const vendorRepository = require("../vendor/respository"); // sesuaikan kalau path/nama fungsinya beda
const {
  SettlementResponse,
  SettlementPreviewResponse,
} = require("./dto");

// commissionPercent disimpan desimal (0.05 = 5%), tinggal dikali langsung
// dibulatkan untuk menghindari floating-point error
const calculateTotals = (boughtProducts) => {
  const totalSales = boughtProducts.reduce((sum, bp) => sum + bp.subtotal, 0);
  const totalCommission = boughtProducts.reduce(
    (sum, bp) => sum + bp.subtotal * bp.commissionPercent,
    0,
  );
  const totalPayout = totalSales - totalCommission;

  return {
    totalSales: Math.round(totalSales),
    totalCommission: Math.round(totalCommission),
    totalPayout: Math.round(totalPayout),
  };
};

const previewSettlement = async (vendorId, periodStart, periodEnd) => {
  const vendor = await vendorRepository.getById(vendorId);
  if (!vendor) {
    const error = new Error("Vendor not found");
    error.statusCode = 404;
    throw error;
  }

  const start = new Date(periodStart);
  const end = new Date(periodEnd);

  const boughtProducts = await settlementRepository.findUnsettledBoughtProducts(
    vendorId,
    start,
    end,
  );

  if (boughtProducts.length === 0) {
    const error = new Error(
      "Tidak ada transaksi yang belum di-settle untuk vendor & periode ini",
    );
    error.statusCode = 400;
    throw error;
  }

  const totals = calculateTotals(boughtProducts);

  return SettlementPreviewResponse({
    vendor,
    periodStart: start,
    periodEnd: end,
    boughtProducts,
    ...totals,
  });
};

const createSettlement = async (data) => {
  const { vendorId, periodStart, periodEnd } = data;

  const vendor = await vendorRepository.getById(vendorId);
  if (!vendor) {
    const error = new Error("Vendor not found");
    error.statusCode = 404;
    throw error;
  }

  const start = new Date(periodStart);
  const end = new Date(periodEnd);

  // Ambil ulang data unsettled saat create, jangan percaya angka dari preview
  // yang mungkin sudah expired (ada transaksi baru masuk sejak preview dibuka)
  const boughtProducts = await settlementRepository.findUnsettledBoughtProducts(
    vendorId,
    start,
    end,
  );

  if (boughtProducts.length === 0) {
    const error = new Error(
      "Tidak ada transaksi yang belum di-settle untuk vendor & periode ini",
    );
    error.statusCode = 400;
    throw error;
  }

  const totals = calculateTotals(boughtProducts);

  const settlement = await settlementRepository.createSettlement(
    {
      vendorId,
      periodStart: start,
      periodEnd: end,
      ...totals,
    },
    boughtProducts.map((bp) => bp.id),
  );

  return SettlementResponse(settlement);
};

const getAllSettlements = async () => {
  const settlements = await settlementRepository.findAll();
  return settlements.map((s) => SettlementResponse(s));
};

const getSettlementById = async (id) => {
  const settlement = await settlementRepository.findById(id);
  if (!settlement) {
    const error = new Error("Settlement not found");
    error.statusCode = 404;
    throw error;
  }
  return SettlementResponse(settlement);
};

const markSettlementAsPaid = async (id) => {
  const existing = await settlementRepository.findById(id);
  if (!existing) {
    const error = new Error("Settlement not found");
    error.statusCode = 404;
    throw error;
  }
  if (existing.status === "PAID") {
    const error = new Error("Settlement ini sudah lunas");
    error.statusCode = 400;
    throw error;
  }

  const updated = await settlementRepository.markAsPaid(id);
  return SettlementResponse(updated);
};

module.exports = {
  previewSettlement,
  createSettlement,
  getAllSettlements,
  getSettlementById,
  markSettlementAsPaid,
};