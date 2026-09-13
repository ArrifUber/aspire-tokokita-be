/*
  Warnings:

  - You are about to drop the column `commision_percent` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "commision_percent",
ADD COLUMN     "commission_percent" DOUBLE PRECISION NOT NULL DEFAULT 0;
