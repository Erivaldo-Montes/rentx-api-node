/*
  Warnings:

  - You are about to drop the column `imagens_urls` on the `cars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cars" DROP COLUMN "imagens_urls",
ADD COLUMN     "imagems_urls" TEXT[];
