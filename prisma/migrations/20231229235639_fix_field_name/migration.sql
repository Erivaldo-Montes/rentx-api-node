/*
  Warnings:

  - You are about to drop the column `imagems_urls` on the `cars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cars" DROP COLUMN "imagems_urls",
ADD COLUMN     "images_urls" TEXT[];
