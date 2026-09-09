/**
 * Transaction Repository
 */

const prisma = require("../../../pkg/prisma");

const findAll = async () => {
  return await prisma.transaction.findMany({
    include: {
      user: true,
      detailTransactions: {
        include: {
          boughtProducts: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findById = async (id) => {
  return await prisma.transaction.findUnique({
    where: { id },
    include: {
      user: true,
      detailTransactions: {
        include: {
          boughtProducts: true,
        },
      },
    },
  });
};

// Format Date -> "yyyyMMdd" tanpa dependency tambahan
const formatDateForInvoice = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
};

// Normalize ke jam 00:00 supaya cocok dengan kolom @db.Date di InvoiceCounter
const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const create = async (transactionData, detailData, boughtProducts) => {
  return await prisma.$transaction(async (tx) => {
    const today = startOfDay(new Date());
    const invoicePrefix = "INV";

    // Atomic increment: upsert counter harian (global, tanpa companyId)
    const counter = await tx.invoiceCounter.upsert({
      where: { date: today },
      update: { lastNumber: { increment: 1 } },
      create: { date: today, lastNumber: 1 },
    });

    const sequenceNumber = counter.lastNumber;
    const invoiceNumber = `${invoicePrefix}/${formatDateForInvoice(
      today,
    )}/${String(sequenceNumber).padStart(4, "0")}`;

    return await tx.transaction.create({
      data: {
        ...transactionData,
        invoiceNumber,
        invoicePrefix,
        sequenceNumber,
        detailTransactions: {
          create: {
            ...detailData,
            boughtProducts: {
              create: boughtProducts,
            },
          },
        },
      },
      include: {
        user: true,
        detailTransactions: {
          include: {
            boughtProducts: true,
          },
        },
      },
    });
  });
};

const update = async (id, data) => {
  return await prisma.transaction.update({
    where: { id },
    data,
    include: {
      user: true,
      detailTransactions: {
        include: {
          boughtProducts: true,
        },
      },
    },
  });
};

const remove = async (id) => {
  // Use a transaction to ensure all related data is deleted
  return await prisma.$transaction(async (tx) => {
    const details = await tx.detailTransaction.findMany({
      where: { transactionId: id },
    });

    for (const detail of details) {
      await tx.boughtProductDetail.deleteMany({
        where: { detailTransactionId: detail.id },
      });
    }

    await tx.detailTransaction.deleteMany({
      where: { transactionId: id },
    });

    return await tx.transaction.delete({
      where: { id },
    });
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};