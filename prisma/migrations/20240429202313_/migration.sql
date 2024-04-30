/*
  Warnings:

  - You are about to drop the column `images_urls` on the `cars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cars" DROP COLUMN "images_urls",
ADD COLUMN     "images_filenames" TEXT[];
