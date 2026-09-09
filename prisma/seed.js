const prisma = require("../internal/pkg/prisma");

// Format Date -> "yyyyMMdd"
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

// Generate invoice number sekaligus increment counter harian (global)
async function generateInvoiceNumber(date = new Date()) {
  const today = startOfDay(date);
  const invoicePrefix = "INV";

  const counter = await prisma.invoiceCounter.upsert({
    where: { date: today },
    update: { lastNumber: { increment: 1 } },
    create: { date: today, lastNumber: 1 },
  });

  const sequenceNumber = counter.lastNumber;
  const invoiceNumber = `${invoicePrefix}/${formatDateForInvoice(
    today,
  )}/${String(sequenceNumber).padStart(4, "0")}`;

  return { invoiceNumber, invoicePrefix, sequenceNumber };
}

async function main() {
  console.log("🌱 Start seeding for reporting test...");

  // Clear existing data
  await prisma.boughtProductDetail.deleteMany();
  await prisma.detailTransaction.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.invoiceCounter.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.stockIncrement.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create User
  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: "password123", // Should be hashed in real scenarios
      role: "OWNER",
    },
  });
  const user1 = await prisma.user.create({
    data: {
      name: "Admin1",
      email: "admin1@example.com",
      password: "password123", // Should be hashed in real scenarios
      role: "CASHIER",
    },
  });

  // Create Categories
  const electronics = await prisma.category.create({
    data: { name: "Elektronik & Gadget" },
  });

  const defaultCategories = [
    "Umum",
    "Makanan & Minuman",
    "Kebutuhan Harian",
    "Pakaian & Aksesoris",
    "Alat Tulis & Kantor",
    "Jasa & Pelayanan",
  ];

  for (const name of defaultCategories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Create Products
  const p1 = await prisma.product.create({
    data: {
      code: "P1",
      name: "Laptop",
      buyPrice: 10000000,
      sellPrice: 12000000,
      stock: 10,
      categoryId: electronics.id,
    },
  });
  const p2 = await prisma.product.create({
    data: {
      code: "P2",
      name: "Mouse",
      buyPrice: 100000,
      sellPrice: 200000,
      stock: 50,
      categoryId: electronics.id,
    },
  });

  // Create Expenses
  await prisma.expense.createMany({
    data: [
      { name: "Listrik", amount: 500000, category: "Operasional" },
      { name: "Internet", amount: 300000, category: "Operasional" },
    ],
  });

  // Generate invoice number untuk transaksi
  const { invoiceNumber, invoicePrefix, sequenceNumber } =
    await generateInvoiceNumber();

  // Create Transaction
  const transaction = await prisma.transaction.create({
    data: {
      userId: user.id,
      totalPrice: 12200000,
      status: "SUCCESS",
      invoiceNumber,
      invoicePrefix,
      sequenceNumber,
      detailTransactions: {
        create: {
          totalCapital: 10100000,
          totalProfit: 2100000,
          paymentAmount: 12200000,
          changeAmount: 0,
          paymentMethod: "CASH",
          boughtProducts: {
            create: [
              {
                productId: p1.id,
                name: p1.name,
                code: p1.code,
                buyPrice: p1.buyPrice,
                sellPrice: p1.sellPrice,
                quantity: 1,
                subtotal: 12000000,
              },
              {
                productId: p2.id,
                name: p2.name,
                code: p2.code,
                buyPrice: p2.buyPrice,
                sellPrice: p2.sellPrice,
                quantity: 1,
                subtotal: 200000,
              },
            ],
          },
        },
      },
    },
  });

  console.log(`✅ Seeding finished. Invoice: ${transaction.invoiceNumber}`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });