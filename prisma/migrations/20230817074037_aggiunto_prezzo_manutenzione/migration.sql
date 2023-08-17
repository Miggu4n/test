/*
  Warnings:

  - The `formula_comfort` column on the `Generatore` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "FormulaComfort" AS ENUM ('FC_5', 'FC_5_5', 'FC_5_3', 'FC_5_3_2', 'FC_5_5_5', 'FC_10');

-- AlterTable
ALTER TABLE "Generatore" ADD COLUMN     "prezzo_manutenzione" DOUBLE PRECISION,
DROP COLUMN "formula_comfort",
ADD COLUMN     "formula_comfort" "FormulaComfort",
ALTER COLUMN "collaudo" DROP NOT NULL;
