/*
  Warnings:

  - Made the column `userId` on table `rentals` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_userId_fkey";

-- AlterTable
ALTER TABLE "rentals" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
