-- AddForeignKey
ALTER TABLE "specification" ADD CONSTRAINT "specification_id_fkey" FOREIGN KEY ("id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
