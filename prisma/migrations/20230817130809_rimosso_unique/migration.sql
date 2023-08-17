/*
  Warnings:

  - Added the required column `periodicita` to the `Generatore` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Periodicita" AS ENUM ('OGNI_ANNO', 'OGNI_DUE_ANNI', 'MAI');

-- DropIndex
DROP INDEX "Ubicazione_impiantoId_key";

-- AlterTable
ALTER TABLE "Generatore" ADD COLUMN     "periodicita" "Periodicita" NOT NULL;
