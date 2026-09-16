/**
 * Dashboard Repository
 */

const prisma = require("../../../pkg/prisma");

// Total omzet (kotor) & komisi toko dari seluruh transaksi
const getOmzetAndKomisi = async () => {
  const [omzetResult, komisiResult, transactionCount] = await Promise.all([
    prisma.transaction.aggregate({
      _sum: { totalPrice: true },
    }),
    prisma.detailTransaction.aggregate({
      _sum: { totalCommission: true },
    }),
    prisma.transaction.count(),
  ]);

  return {
    totalOmzet: omzetResult._sum.totalPrice || 0,
    totalKomisi: komisiResult._sum.totalCommission || 0,
    totalTransaksi: transactionCount,
  };
};

// Total produk aktif
const getTotalProduk = async () => {
  return await prisma.product.count();
};

// Total yang belum dibayar ke vendor (dari BoughtProductDetail yang belum di-settle)
const getBelumDibayarVendor = async () => {
  const unsettled = await prisma.boughtProductDetail.findMany({
    where: { settlementId: null },
    select: { subtotal: true, commissionPercent: true },
  });

  const total = unsettled.reduce((sum, bp) => {
    const commission = bp.subtotal * bp.commissionPercent;
    return sum + (bp.subtotal - commission);
  }, 0);

  return Math.round(total);
};

// Transaksi dalam N hari terakhir, untuk dihitung tren per hari di service
const getTransactionsInRange = async (startDate, endDate) => {
  return await prisma.transaction.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      totalPrice: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });
};

// Top produk terlaris (berdasarkan total quantity terjual)
const getTopProducts = async (limit = 5) => {
  const grouped = await prisma.boughtProductDetail.groupBy({
    by: ["productId", "name"],
    _sum: { quantity: true },
    orderBy: {
      _sum: { quantity: "desc" },
    },
    take: limit,
  });

  return grouped.map((g) => ({
    productId: g.productId,
    name: g.name,
    totalSold: g._sum.quantity || 0,
  }));
};

// Ringkasan status settlement (hitung berdasarkan jumlah unit settlement)
const getVendorSettlementCoverage = async () => {
  const [unprocessedGroup, unpaid, paid] = await Promise.all([
    // 1. Hitung settlement yang BELUM DIBUAT 
    // (Mengelompokkan vendor yang punya produk terjual dengan settlementId = null)
    prisma.boughtProductDetail.groupBy({
      by: ["vendorId"],
      where: {
        settlementId: null,
        vendorId: { not: null },
      },
    }),

    // 2. Hitung total record settlement MENUNGGU DIBAYAR (UNPAID)
    prisma.vendorSettlement.count({
      where: { status: "UNPAID" },
    }),

    // 3. Hitung total record settlement SUDAH LUNAS (PAID)
    prisma.vendorSettlement.count({
      where: { status: "PAID" },
    }),
  ]);

  return {
    paid,
    unpaid,
    unprocessed: unprocessedGroup.length,
  };
};

// Transaksi terbaru (untuk widget "Transaksi Terbaru")
const getRecentTransactions = async (limit = 5) => {
  return await prisma.transaction.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      detailTransactions: {
        include: { boughtProducts: true },
      },
    },
  });
};

// Penjualan per kategori (join lewat product -> category)
const getSalesByCategory = async () => {
  const boughtProducts = await prisma.boughtProductDetail.findMany({
    select: {
      subtotal: true,
      product: {
        select: {
          category: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });

  // Agregasi per kategori di JS karena Prisma groupBy tidak bisa langsung
  // group berdasarkan field dari relasi nested
  const map = {};
  boughtProducts.forEach((bp) => {
    const cat = bp.product?.category;
    if (!cat) return;
    if (!map[cat.id]) {
      map[cat.id] = { categoryId: cat.id, name: cat.name, totalSales: 0 };
    }
    map[cat.id].totalSales += bp.subtotal;
  });

  return Object.values(map).sort((a, b) => b.totalSales - a.totalSales);
};

// Produk dengan stok menipis (stock <= minimumStock)
const getLowStockProducts = async (limit = 5) => {
  // Prisma belum mendukung perbandingan antar-kolom di where secara langsung,
  // jadi ambil produk aktif lalu filter di JS
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: {
      id: true,
      code: true,
      name: true,
      stock: true,
      minimumStock: true,
      vendor: { select: { name: true } },
    },
    orderBy: { stock: "asc" },
  });

  return products
    .filter((p) => p.stock <= p.minimumStock)
    .slice(0, limit);
};

module.exports = {
  getOmzetAndKomisi,
  getTotalProduk,
  getBelumDibayarVendor,
  getTransactionsInRange,
  getTopProducts,
  getVendorSettlementCoverage,
  getRecentTransactions,
  getSalesByCategory,      
  getLowStockProducts,     
};