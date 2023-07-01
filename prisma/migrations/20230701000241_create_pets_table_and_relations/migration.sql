/*
  Warnings:

  - Added the required column `age` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ambient` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energy` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('NEWBORN', 'PUPPY', 'YOUNG', 'ADULT', 'OLD');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('EXTRASMALL', 'SMALL', 'MEDIUM', 'LARGE', 'EXTRALARGE');

-- CreateEnum
CREATE TYPE "PetEnergy" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "PetAmbient" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'EXTRALARGE');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "age" "PetAge" NOT NULL,
ADD COLUMN     "ambient" "PetAmbient" NOT NULL,
ADD COLUMN     "energy" "PetEnergy" NOT NULL,
ADD COLUMN     "size" "PetSize" NOT NULL;

-- CreateTable
CREATE TABLE "pictures" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoption_requirements" (
    "id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petId" TEXT NOT NULL,

    CONSTRAINT "adoption_requirements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption_requirements" ADD CONSTRAINT "adoption_requirements_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
