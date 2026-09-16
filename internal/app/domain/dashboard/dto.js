/**
 * Dashboard DTOs (Data Transfer Objects)
 */

const SummaryResponse = (data) => ({
  totalOmzet: data.totalOmzet,
  totalKomisi: data.totalKomisi,
  totalBelumDibayarVendor: data.totalBelumDibayarVendor,
  totalProduk: data.totalProduk,
  totalTransaksi: data.totalTransaksi,
});

const TrendItemResponse = (item) => ({
  date: item.date, // format "yyyy-MM-dd"
  totalPrice: item.totalPrice,
});

const TopProductResponse = (item) => ({
  productId: item.productId,
  name: item.name,
  totalSold: item.totalSold,
});

const SettlementStatusResponse = (data) => ({
  paid: data.paid,
  unpaid: data.unpaid,
  unprocessed: data.unprocessed,
});

const RecentTransactionResponse = (transaction) => {
  // Ambil ringkasan produk pertama sebagai representasi (untuk tampilan ringkas di dashboard)
  const firstDetail = transaction.detailTransactions?.[0];
  const firstProduct = firstDetail?.boughtProducts?.[0];

  return {
    id: transaction.id,
    invoiceNumber: transaction.invoiceNumber,
    createdAt: transaction.createdAt,
    productName: firstProduct?.name || "-",
    totalItems: firstDetail?.boughtProducts?.length || 0,
    totalPrice: transaction.totalPrice,
  };
};

const CategorySalesResponse = (item, totalAllCategories) => ({
  categoryId: item.categoryId,
  name: item.name,
  totalSales: item.totalSales,
  percentage:
    totalAllCategories > 0
      ? Math.round((item.totalSales / totalAllCategories) * 100)
      : 0,
});

const LowStockProductResponse = (product) => ({
  id: product.id,
  code: product.code,
  name: product.name,
  stock: product.stock,
  minimumStock: product.minimumStock,
  vendorName: product.vendor?.name || "-",
});

module.exports = {
  SummaryResponse,
  TrendItemResponse,
  TopProductResponse,
  SettlementStatusResponse,
  RecentTransactionResponse,
  CategorySalesResponse,
  LowStockProductResponse
};