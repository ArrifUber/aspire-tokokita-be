const prisma = require("../../../pkg/prisma");

const getTransactionsByDateRange = async (startDate, endDate) => {
  const start = startDate ? new Date(startDate) : new Date(0);
  const end = endDate ? new Date(endDate) : new Date();

  return await prisma.transaction.findMany({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    include: {
      detailTransactions: {
        include: {
          boughtProducts: true,
        },
      },
    },
  });
};

const getExpensesByDateRange = async (startDate, endDate) => {
  const start = startDate ? new Date(startDate) : new Date(0);
  const end = endDate ? new Date(endDate) : new Date();

  return await prisma.expense.findMany({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
    },
  });
};

module.exports = {
  getTransactionsByDateRange,
  getExpensesByDateRange,
};
