/*
  Warnings:

  - Added the required column `category_id` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "category_id" TEXT NOT NULL;
