/*
  Warnings:

  - Added the required column `updated_at` to the `DatabaseModule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DatabaseModule" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
