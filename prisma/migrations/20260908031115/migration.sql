/*
  Warnings:

  - You are about to drop the column `company_id` on the `invoice_counters` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "invoice_counters" DROP CONSTRAINT "invoice_counters_company_id_fkey";

-- DropIndex
DROP INDEX "invoice_counters_company_id_date_key";

-- AlterTable
ALTER TABLE "invoice_counters" DROP COLUMN "company_id";
