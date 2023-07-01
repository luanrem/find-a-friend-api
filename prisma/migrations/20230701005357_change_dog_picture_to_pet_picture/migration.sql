/*
  Warnings:

  - You are about to drop the `pictures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pictures" DROP CONSTRAINT "pictures_pet_id_fkey";

-- DropTable
DROP TABLE "pictures";

-- CreateTable
CREATE TABLE "pet_pictures" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pet_pictures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet_pictures" ADD CONSTRAINT "pet_pictures_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
