/*
  Warnings:

  - Added the required column `car_id` to the `specification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "specification" DROP CONSTRAINT "specification_id_fkey";

-- AlterTable
ALTER TABLE "specification" ADD COLUMN     "car_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "specification" ADD CONSTRAINT "specification_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
