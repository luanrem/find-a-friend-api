/*
  Warnings:

  - A unique constraint covering the columns `[whatsapp]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Made the column `address` on table `orgs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cep` on table `orgs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "cep" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orgs_whatsapp_key" ON "orgs"("whatsapp");
