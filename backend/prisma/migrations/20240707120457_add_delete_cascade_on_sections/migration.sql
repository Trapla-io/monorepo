-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_travel_book_id_fkey";

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_travel_book_id_fkey" FOREIGN KEY ("travel_book_id") REFERENCES "TravelBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
