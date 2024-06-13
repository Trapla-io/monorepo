-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "cover_image_id" INTEGER,
    "travel_book_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_cover_image_id_fkey" FOREIGN KEY ("cover_image_id") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_travel_book_id_fkey" FOREIGN KEY ("travel_book_id") REFERENCES "TravelBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
