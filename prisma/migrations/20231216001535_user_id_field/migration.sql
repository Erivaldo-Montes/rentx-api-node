/*
  Warnings:

  - You are about to drop the column `userId` on the `rentals` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_userId_fkey";

-- AlterTable
ALTER TABLE "rentals" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
