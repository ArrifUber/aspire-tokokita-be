/*
  Warnings:

  - You are about to drop the column `bank_account_holder` on the `vendors` table. All the data in the column will be lost.
  - You are about to drop the column `bank_account_number` on the `vendors` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `vendors` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `vendors` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `vendors` table. All the data in the column will be lost.
  - You are about to drop the column `payment_term` on the `vendors` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `vendors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vendors" DROP CONSTRAINT "vendors_company_id_fkey";

-- AlterTable
ALTER TABLE "vendors" DROP COLUMN "bank_account_holder",
DROP COLUMN "bank_account_number",
DROP COLUMN "code",
DROP COLUMN "company_id",
DROP COLUMN "email",
DROP COLUMN "payment_term",
DROP COLUMN "type",
ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "jumlah_produk" INTEGER DEFAULT 0,
ADD COLUMN     "no_rekening" TEXT;

-- AddForeignKey
ALTER TABLE "vendors" ADD CONSTRAINT "vendors_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
