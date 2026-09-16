/**
 * Settlement Repository
 */

const prisma = require("../../../pkg/prisma");

// Ambil semua BoughtProductDetail milik vendor tertentu, dalam rentang tanggal,
// yang belum pernah masuk settlement manapun (settlementId masih null)
const findUnsettledBoughtProducts = async (vendorId, periodStart, periodEnd) => {
  return await prisma.boughtProductDetail.findMany({
    where: {
      vendorId,
      settlementId: null,
      createdAt: {
        gte: periodStart,
        lte: periodEnd,
      },
    },
    orderBy: { createdAt: "asc" },
  });
};

// Buat settlement baru + tandai semua BoughtProductDetail terkait secara atomic
const createSettlement = async (settlementData, boughtProductIds) => {
  return await prisma.$transaction(async (tx) => {
    const settlement = await tx.vendorSettlement.create({
      data: settlementData,
    });

    await tx.boughtProductDetail.updateMany({
      where: { id: { in: boughtProductIds } },
      data: { settlementId: settlement.id },
    });

    return await tx.vendorSettlement.findUnique({
      where: { id: settlement.id },
      include: {
        vendor: true,
        boughtProducts: true,
      },
    });
  });
};

const findAll = async () => {
  return await prisma.vendorSettlement.findMany({
    include: {
      vendor: true,
      boughtProducts: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const findById = async (id) => {
  return await prisma.vendorSettlement.findUnique({
    where: { id },
    include: {
      vendor: true,
      boughtProducts: true,
    },
  });
};

const markAsPaid = async (id) => {
  return await prisma.vendorSettlement.update({
    where: { id },
    data: {
      status: "PAID",
      paidAt: new Date(),
    },
    include: {
      vendor: true,
      boughtProducts: true,
    },
  });
};


// Ambil semua vendor yang punya BoughtProductDetail belum di-settle,
// dikelompokkan per vendor dengan total nilainya
const getUnprocessedByVendor = async () => {
  const items = await prisma.boughtProductDetail.findMany({
    where: { settlementId: null, vendorId: { not: null } },
    select: {
      vendorId: true,
      subtotal: true,
      commissionPercent: true,
      vendor: { select: { name: true } },
    },
  });

  const map = {};
  items.forEach((item) => {
    if (!map[item.vendorId]) {
      map[item.vendorId] = {
        vendorId: item.vendorId,
        vendorName: item.vendor.name,
        totalPayout: 0,
      };
    }
    const commission = item.subtotal * item.commissionPercent;
    map[item.vendorId].totalPayout += item.subtotal - commission;
  });

  return Object.values(map).map((v) => ({
    ...v,
    totalPayout: Math.round(v.totalPayout),
  }));
};

// Ambil semua settlement berstatus UNPAID, dikelompokkan per vendor
const getUnpaidByVendor = async () => {
  const settlements = await prisma.vendorSettlement.findMany({
    where: { status: "UNPAID" },
    select: {
      vendorId: true,
      totalPayout: true,
      vendor: { select: { name: true } },
    },
  });

  const map = {};
  settlements.forEach((s) => {
    if (!map[s.vendorId]) {
      map[s.vendorId] = {
        vendorId: s.vendorId,
        vendorName: s.vendor.name,
        totalPayout: 0,
        settlementCount: 0,
      };
    }
    map[s.vendorId].totalPayout += s.totalPayout;
    map[s.vendorId].settlementCount += 1;
  });

  return Object.values(map);
};

module.exports = {
  findUnsettledBoughtProducts,
  createSettlement,
  findAll,
  findById,
  markAsPaid,
  getUnpaidByVendor,
  getUnprocessedByVendor
};