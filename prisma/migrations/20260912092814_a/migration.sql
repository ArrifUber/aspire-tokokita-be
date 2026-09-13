/*
  Warnings:

  - You are about to drop the column `buyPrice` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company_limitations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "company_limitations" DROP CONSTRAINT "company_limitations_company_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_company_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_company_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "buyPrice",
ADD COLUMN     "commision_percent" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vendor_id" TEXT;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "company_id";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "company_id";

-- AlterTable
ALTER TABLE "vendors" ALTER COLUMN "jumlah_produk" SET DEFAULT 0;

-- DropTable
DROP TABLE "companies";

-- DropTable
DROP TABLE "company_limitations";

-- DropTable
DROP TABLE "expenses";

-- DropTable
DROP TABLE "plans";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
