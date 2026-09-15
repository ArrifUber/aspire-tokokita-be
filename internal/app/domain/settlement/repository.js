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

module.exports = {
  findUnsettledBoughtProducts,
  createSettlement,
  findAll,
  findById,
  markAsPaid,
};