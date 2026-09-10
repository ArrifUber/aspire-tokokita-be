-- CreateTable
CREATE TABLE "vendors" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "type" TEXT DEFAULT 'SUPPLIER',
    "pic_name" TEXT,
    "pic_phone" TEXT,
    "email" TEXT,
    "bank_name" TEXT,
    "bank_account_number" TEXT,
    "bank_account_holder" TEXT,
    "payment_term" TEXT DEFAULT 'CASH',
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vendors" ADD CONSTRAINT "vendors_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
