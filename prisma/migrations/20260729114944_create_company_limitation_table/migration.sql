-- CreateTable
CREATE TABLE "company_limitations" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "limitation" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_limitations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_limitations" ADD CONSTRAINT "company_limitations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
