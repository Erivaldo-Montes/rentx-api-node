/*
  Warnings:

  - You are about to alter the column `daily_rate` on the `cars` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "cars" ALTER COLUMN "daily_rate" SET DATA TYPE DOUBLE PRECISION;
