/*
  Warnings:

  - A unique constraint covering the columns `[codice_impianto,chiave]` on the table `Impianto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[impiantoId]` on the table `Ubicazione` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Impianto" ADD COLUMN     "chiave" TEXT;

-- AlterTable
ALTER TABLE "Ubicazione" ALTER COLUMN "cap" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Impianto_codice_impianto_chiave_key" ON "Impianto"("codice_impianto", "chiave");

-- CreateIndex
CREATE UNIQUE INDEX "Ubicazione_impiantoId_key" ON "Ubicazione"("impiantoId");
