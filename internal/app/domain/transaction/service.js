/**
 * Transaction Service
 */

const transactionRepository = require("./repository");
const productRepository = require("../product/repository");
const { TransactionResponse } = require("./dto");

const calculateCommission = (sellPrice, quantity, commissionPercent) => {
  return Math.round(sellPrice * quantity * commissionPercent);
};

const getAllTransactions = async () => {
  const transactions = await transactionRepository.findAll();
  return transactions.map((transaction) => TransactionResponse(transaction));
};

const getTransactionById = async (id) => {
  const transaction = await transactionRepository.findById(id);
  if (!transaction) {
    const error = new Error("Transaction not found");
    error.statusCode = 404;
    throw error;
  }
  return TransactionResponse(transaction);
};

const createTransaction = async (transactionData) => {
  const { detail, ...headerData } = transactionData;
  const { products: requestProducts, ...detailFields } = detail;

  const boughtProducts = [];
  let totalCommission = 0

  // Process each product: Fetch current info, check stock, and prepare snapshot
  for (const item of requestProducts) {
    const product = await productRepository.findById(item.productId);
    if (!product) {
      const error = new Error(`Product with ID ${item.productId} not found`);
      error.statusCode = 404;
      throw error;
    }

    if (product.stock < item.quantity) {
      const error = new Error(
        `Insufficient stock for product: ${product.name}`,
      );
      error.statusCode = 400;
      throw error;
    }


    const commission = calculateCommission(
      product.sellPrice,
      item.quantity,
      product.commissionPercent,
    );
    totalCommission += commission;

    // Prepare historical snapshot for this transaction
    boughtProducts.push({
      productId: product.id,
      vendorId: product.vendorId,
      name: product.name,
      code: product.code,
      sellPrice: product.sellPrice,
      commissionPercent: product.commissionPercent,
      quantity: item.quantity,
      subtotal: product.sellPrice * item.quantity,
    });

    // Update product stock in database
    await productRepository.update(product.id, {
      stock: product.stock - item.quantity,
    });
  }

  // invoiceNumber, invoicePrefix, sequenceNumber di-generate secara atomic
  // di dalam transactionRepository.create()
    const newTransaction = await transactionRepository.create(
    headerData,
    { ...detailFields, totalCommission },
    boughtProducts,
  );
  return TransactionResponse(newTransaction);
};

const updateTransaction = async (id, transactionData) => {
  await getTransactionById(id);
  const updatedTransaction = await transactionRepository.update(
    id,
    transactionData,
  );
  return TransactionResponse(updatedTransaction);
};

const deleteTransaction = async (id) => {
  await getTransactionById(id);
  return await transactionRepository.remove(id);
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};