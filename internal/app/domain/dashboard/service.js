/**
 * Dashboard Service
 */

const dashboardRepository = require("./repository");
const {
  SummaryResponse,
  TrendItemResponse,
  TopProductResponse,
  SettlementStatusResponse,
  RecentTransactionResponse,
  CategorySalesResponse,
  LowStockProductResponse
} = require("./dto");

const formatDateKey = (date) => {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const getSummary = async () => {
  const [{ totalOmzet, totalKomisi, totalTransaksi }, totalProduk, totalBelumDibayarVendor] =
    await Promise.all([
      dashboardRepository.getOmzetAndKomisi(),
      dashboardRepository.getTotalProduk(),
      dashboardRepository.getBelumDibayarVendor(),
    ]);

  return SummaryResponse({
    totalOmzet,
    totalKomisi,
    totalBelumDibayarVendor,
    totalProduk,
    totalTransaksi,
  });
};

// Tren penjualan N hari terakhir, di-grouping per tanggal di sini (JS),
// karena dataset harian biasanya kecil, jadi tidak perlu raw SQL groupBy tanggal
const getSalesTrend = async (days = 7) => {
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - (days - 1));
  startDate.setHours(0, 0, 0, 0);

  const transactions = await dashboardRepository.getTransactionsInRange(
    startDate,
    endDate,
  );

  // Siapkan bucket kosong untuk setiap hari dalam rentang, supaya hari tanpa
  // transaksi tetap muncul sebagai 0 (bukan hilang dari chart)
  const buckets = {};
  for (let i = 0; i < days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    buckets[formatDateKey(d)] = 0;
  }

  transactions.forEach((trx) => {
    const key = formatDateKey(trx.createdAt);
    if (buckets[key] !== undefined) {
      buckets[key] += trx.totalPrice;
    }
  });

  return Object.entries(buckets).map(([date, totalPrice]) =>
    TrendItemResponse({ date, totalPrice }),
  );
};

const getTopProducts = async (limit = 5) => {
  const products = await dashboardRepository.getTopProducts(limit);
  return products.map((p) => TopProductResponse(p));
};

const getSettlementStatus = async () => {
  const coverage = await dashboardRepository.getVendorSettlementCoverage();
  return SettlementStatusResponse(coverage);
};

const getRecentTransactions = async (limit = 5) => {
  const transactions = await dashboardRepository.getRecentTransactions(limit);
  return transactions.map((t) => RecentTransactionResponse(t));
};

const getSalesByCategory = async () => {
  const categories = await dashboardRepository.getSalesByCategory();
  const totalAll = categories.reduce((sum, c) => sum + c.totalSales, 0);
  return categories.map((c) => CategorySalesResponse(c, totalAll));
};

const getLowStockProducts = async (limit = 5) => {
  const products = await dashboardRepository.getLowStockProducts(limit);
  return products.map((p) => LowStockProductResponse(p));
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