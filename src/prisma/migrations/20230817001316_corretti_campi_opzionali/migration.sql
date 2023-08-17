/*
  Warnings:

  - Made the column `impiantoId` on table `Generatore` required. This step will fail if there are existing NULL values in that column.
  - Made the column `generatoreId` on table `Intervento` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Generatore" DROP CONSTRAINT "Generatore_impiantoId_fkey";

-- DropForeignKey
ALTER TABLE "Intervento" DROP CONSTRAINT "Intervento_generatoreId_fkey";

-- AlterTable
ALTER TABLE "Generatore" ALTER COLUMN "impiantoId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Intervento" ALTER COLUMN "generatoreId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Generatore" ADD CONSTRAINT "Generatore_impiantoId_fkey" FOREIGN KEY ("impiantoId") REFERENCES "Impianto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervento" ADD CONSTRAINT "Intervento_generatoreId_fkey" FOREIGN KEY ("generatoreId") REFERENCES "Generatore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
