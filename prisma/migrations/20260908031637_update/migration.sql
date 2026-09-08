/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `invoice_counters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "invoice_counters_date_key" ON "invoice_counters"("date");
