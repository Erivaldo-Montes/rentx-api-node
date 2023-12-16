-- DropForeignKey
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_car_id_fkey";

-- AlterTable
ALTER TABLE "rentals" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
