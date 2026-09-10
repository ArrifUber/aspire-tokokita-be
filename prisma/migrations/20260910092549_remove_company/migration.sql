/*
  Warnings:

  - You are about to drop the column `companyId` on the `vendors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vendors" DROP CONSTRAINT "vendors_companyId_fkey";

-- AlterTable
ALTER TABLE "vendors" DROP COLUMN "companyId";
