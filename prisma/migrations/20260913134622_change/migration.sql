/*
  Warnings:

  - You are about to drop the column `totalCapital` on the `detail_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `totalProfit` on the `detail_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `vendors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bought_product_details" ADD COLUMN     "commission_percent" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vendor_id" TEXT;

-- AlterTable
ALTER TABLE "detail_transactions" DROP COLUMN "totalCapital",
DROP COLUMN "totalProfit",
ADD COLUMN     "total_commission" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "vendors" DROP COLUMN "is_active";
