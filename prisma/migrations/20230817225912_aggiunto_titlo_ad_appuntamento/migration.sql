/*
  Warnings:

  - Added the required column `titolo` to the `Appuntamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appuntamento" ADD COLUMN     "titolo" TEXT NOT NULL;
