-- CreateTable
CREATE TABLE "TravelBook" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "destination" TEXT,
    "sections" JSONB[],
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "TravelBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TravelBook" ADD CONSTRAINT "TravelBook_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
