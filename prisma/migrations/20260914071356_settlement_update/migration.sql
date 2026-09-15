-- CreateEnum
CREATE TYPE "SettlementStatus" AS ENUM ('UNPAID', 'PAID');

-- AlterTable
ALTER TABLE "bought_product_details" ADD COLUMN     "settlement_id" TEXT;

-- CreateTable
CREATE TABLE "vendor_settlements" (
    "id" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "period_start" TIMESTAMP(3) NOT NULL,
    "period_end" TIMESTAMP(3) NOT NULL,
    "total_sales" DOUBLE PRECISION NOT NULL,
    "total_commission" DOUBLE PRECISION NOT NULL,
    "total_payout" DOUBLE PRECISION NOT NULL,
    "status" "SettlementStatus" NOT NULL DEFAULT 'UNPAID',
    "paid_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_settlements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bought_product_details" ADD CONSTRAINT "bought_product_details_settlement_id_fkey" FOREIGN KEY ("settlement_id") REFERENCES "vendor_settlements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_settlements" ADD CONSTRAINT "vendor_settlements_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
