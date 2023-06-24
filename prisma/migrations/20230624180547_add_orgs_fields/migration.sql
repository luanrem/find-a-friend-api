/*
  Warnings:

  - Added the required column `address` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "whatsapp" TEXT NOT NULL;
