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
  console.log("🌱 Start seeding for fashion store...");

  // Clear existing data (urutan sesuai relasi FK)
  await prisma.boughtProductDetail.deleteMany();
  await prisma.detailTransaction.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.invoiceCounter.deleteMany();
  await prisma.stockIncrement.deleteMany();
  await prisma.product.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // === USERS ===
  const owner = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: "password123", // TODO: hash di real scenario
      role: "OWNER",
    },
  });

  const cashier = await prisma.user.create({
    data: {
      name: "Kasir Toko",
      email: "kasir@example.com",
      password: "password123",
      role: "CASHIER",
    },
  });

  // === CATEGORIES (umum untuk toko fashion) ===
  const categoryNames = [
    "Pakaian Pria",
    "Pakaian Wanita",
    "Pakaian Anak",
    "Sepatu",
    "Tas",
    "Aksesoris Fashion",
  ];

  const categories = {};
  for (const name of categoryNames) {
    const cat = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    categories[name] = cat;
  }

  // === VENDORS (bertema fashion) ===
  const vendorBusana = await prisma.vendor.create({
    data: {
      name: "CV Busana Elok Nusantara",
      picName: "Dewi Anjani",
      picPhone: "081234567801",
      rekening: "Bank BCA",
      noRekening: "1110022003",
      isActive: true
    },
  });

  const vendorSepatu = await prisma.vendor.create({
    data: {
      name: "PT Sepatu Prima Sentosa",
      picName: "Bagas Hermawan",
      picPhone: "081234567802",
      rekening: "Bank Mandiri",
      noRekening: "2220033004",
      isActive: true
    },
  });

  const vendorAksesoris = await prisma.vendor.create({
    data: {
      name: "UD Tas & Aksesoris Cantika",
      picName: "Rani Puspita",
      picPhone: "081234567803",
      rekening: "Bank BRI",
      noRekening: "3330044005",
      isActive: true
    },
  });

  // === PRODUCTS ===
  const productData = [
    // Pakaian Pria
    {
      code: "PP-001",
      name: "Kemeja Flanel Pria Lengan Panjang",
      categoryId: categories["Pakaian Pria"].id,
      vendorId: vendorBusana.id,
      sellPrice: 175000,
      stock: 40,
      commissionPercent: 0.05,
    },
    {
      code: "PP-002",
      name: "Celana Chino Pria Slim Fit",
      categoryId: categories["Pakaian Pria"].id,
      vendorId: vendorBusana.id,
      sellPrice: 220000,
      stock: 30,
      commissionPercent: 0.05,
    },
    // Pakaian Wanita
    {
      code: "PW-001",
      name: "Blouse Wanita Motif Bunga",
      categoryId: categories["Pakaian Wanita"].id,
      vendorId: vendorBusana.id,
      sellPrice: 150000,
      stock: 45,
      commissionPercent: 0.05,
    },
    {
      code: "PW-002",
      name: "Rok Plisket Wanita",
      categoryId: categories["Pakaian Wanita"].id,
      vendorId: vendorBusana.id,
      sellPrice: 135000,
      stock: 35,
      commissionPercent: 0.05,
    },
    // Pakaian Anak
    {
      code: "PA-001",
      name: "Setelan Kaos Anak Karakter",
      categoryId: categories["Pakaian Anak"].id,
      vendorId: vendorBusana.id,
      sellPrice: 95000,
      stock: 50,
      commissionPercent: 0.04,
    },
    // Sepatu
    {
      code: "SP-001",
      name: "Sepatu Sneakers Pria Casual",
      categoryId: categories["Sepatu"].id,
      vendorId: vendorSepatu.id,
      sellPrice: 320000,
      stock: 25,
      commissionPercent: 0.07,
    },
    {
      code: "SP-002",
      name: "Sepatu Flat Wanita",
      categoryId: categories["Sepatu"].id,
      vendorId: vendorSepatu.id,
      sellPrice: 210000,
      stock: 30,
      commissionPercent: 0.07,
    },
    // Tas
    {
      code: "TS-001",
      name: "Tas Selempang Wanita Kulit Sintetis",
      categoryId: categories["Tas"].id,
      vendorId: vendorAksesoris.id,
      sellPrice: 185000,
      stock: 20,
      commissionPercent: 0.06,
    },
    {
      code: "TS-002",
      name: "Tas Ransel Kanvas Unisex",
      categoryId: categories["Tas"].id,
      vendorId: vendorAksesoris.id,
      sellPrice: 165000,
      stock: 28,
      commissionPercent: 0.06,
    },
    // Aksesoris Fashion
    {
      code: "AK-001",
      name: "Kacamata Fashion Anti UV",
      categoryId: categories["Aksesoris Fashion"].id,
      vendorId: vendorAksesoris.id,
      sellPrice: 85000,
      stock: 60,
      commissionPercent: 0.08,
    },
    {
      code: "AK-002",
      name: "Ikat Pinggang Kulit Pria",
      categoryId: categories["Aksesoris Fashion"].id,
      vendorId: vendorAksesoris.id,
      sellPrice: 75000,
      stock: 5, // sengaja rendah untuk uji fitur minimum stock
      minimumStock: 8,
      commissionPercent: 0.08,
    },
  ];

  const products = {};
  for (const p of productData) {
    const created = await prisma.product.create({ data: p });
    products[p.code] = created;
  }

  // Update jumlahProduk per vendor
  for (const vendorId of [vendorBusana.id, vendorSepatu.id, vendorAksesoris.id]) {
    const count = await prisma.product.count({ where: { vendorId } });
    await prisma.vendor.update({
      where: { id: vendorId },
      data: { jumlahProduk: count },
    });
  }

  // === CONTOH TRANSAKSI ===
  const { invoiceNumber, invoicePrefix, sequenceNumber } =
    await generateInvoiceNumber();

  const p1 = products["PP-001"]; // Kemeja Flanel
  const p2 = products["SP-001"]; // Sneakers

  const totalPrice = p1.sellPrice * 1 + p2.sellPrice * 1;

  const transaction = await prisma.transaction.create({
    data: {
      userId: cashier.id,
      customerName: "Pelanggan Umum",
      totalPrice,
      status: "SUCCESS",
      invoiceNumber,
      invoicePrefix,
      sequenceNumber,
      detailTransactions: {
        create: {
          totalCapital: 0, // isi manual jika ada data harga modal
          totalProfit: 0,
          paymentAmount: totalPrice,
          changeAmount: 0,
          paymentMethod: "CASH",
          boughtProducts: {
            create: [
              {
                productId: p1.id,
                name: p1.name,
                code: p1.code,
                sellPrice: p1.sellPrice,
                quantity: 1,
                subtotal: p1.sellPrice,
              },
              {
                productId: p2.id,
                name: p2.name,
                code: p2.code,
                sellPrice: p2.sellPrice,
                quantity: 1,
                subtotal: p2.sellPrice,
              },
            ],
          },
        },
      },
    },
  });

  console.log(`✅ Seeding selesai. Invoice: ${transaction.invoiceNumber}`);
  console.log(`   User: ${owner.email}, ${cashier.email}`);
  console.log(`   Kategori: ${Object.keys(categories).length}`);
  console.log(`   Vendor: 3`);
  console.log(`   Produk: ${Object.keys(products).length}`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });