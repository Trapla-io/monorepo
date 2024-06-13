/*
  Warnings:

  - You are about to drop the column `cover_image_id` on the `Section` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_cover_image_id_fkey";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "cover_image_id",
ADD COLUMN     "cover_image" JSONB;
