-- AddForeignKey
ALTER TABLE "bought_product_details" ADD CONSTRAINT "bought_product_details_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
