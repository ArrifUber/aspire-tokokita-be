/*
  Warnings:

  - You are about to drop the column `buyPrice` on the `bought_product_details` table. All the data in the column will be lost.
  - Made the column `pic_name` on table `vendors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pic_phone` on table `vendors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bank_name` on table `vendors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jumlah_produk` on table `vendors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `no_rekening` on table `vendors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bought_product_details" DROP COLUMN "buyPrice";

-- AlterTable
ALTER TABLE "vendors" ALTER COLUMN "pic_name" SET NOT NULL,
ALTER COLUMN "pic_phone" SET NOT NULL,
ALTER COLUMN "bank_name" SET NOT NULL,
ALTER COLUMN "jumlah_produk" SET NOT NULL,
ALTER COLUMN "no_rekening" SET NOT NULL;
