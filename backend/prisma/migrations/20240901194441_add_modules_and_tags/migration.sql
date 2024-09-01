/*
  Warnings:

  - You are about to drop the column `created_at` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `TravelBookmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagToTravelBookmark` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TravelBookmark" DROP CONSTRAINT "TravelBookmark_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTravelBookmark" DROP CONSTRAINT "_TagToTravelBookmark_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTravelBookmark" DROP CONSTRAINT "_TagToTravelBookmark_B_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- DropTable
DROP TABLE "TravelBookmark";

-- DropTable
DROP TABLE "_TagToTravelBookmark";

-- CreateTable
CREATE TABLE "DatabaseModule" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "type" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DatabaseModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DatabaseModuleToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DatabaseModuleToTag_AB_unique" ON "_DatabaseModuleToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_DatabaseModuleToTag_B_index" ON "_DatabaseModuleToTag"("B");

-- AddForeignKey
ALTER TABLE "DatabaseModule" ADD CONSTRAINT "DatabaseModule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DatabaseModuleToTag" ADD CONSTRAINT "_DatabaseModuleToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "DatabaseModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DatabaseModuleToTag" ADD CONSTRAINT "_DatabaseModuleToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
