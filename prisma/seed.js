const prisma = require("../internal/pkg/prisma");

async function main() {
  console.log("🌱 Start seeding for reporting test...");

  // Clear existing data
  await prisma.boughtProductDetail.deleteMany();
  await prisma.detailTransaction.deleteMany();
  await prisma.transaction.deleteMany();
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
    "Umum", // Untuk produk cepat/bebas tanpa kategori spesifik
    "Makanan & Minuman", // Cocok untuk Mini Market, Cafe, Resto
    "Kebutuhan Harian", // Peralatan mandi, pembersih, kebutuhan rumah
    "Pakaian & Aksesoris", // Fashion, sepatu, tas, atau aksesoris fashion/gadget
    "Alat Tulis & Kantor", // ATK, kertas, perlengkapan kerja/sekolah
    "Jasa & Pelayanan", // Untuk item non-fisik (misal: jasa service, ongkir, instalasi)
  ];

  for (const name of defaultCategories) {
    await prisma.category.upsert({
      where: { name }, // Pastikan field name di Prisma schema bernilai @unique
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

  // Create Transaction
  const transaction = await prisma.transaction.create({
    data: {
      userId: user.id,
      totalPrice: 12200000,
      status: "SUCCESS",
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

  console.log("✅ Seeding finished.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
