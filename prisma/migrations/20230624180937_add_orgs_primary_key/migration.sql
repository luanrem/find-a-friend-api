/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "cep" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");
