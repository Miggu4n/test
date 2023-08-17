/*
  Warnings:

  - The values [COLLAUDO] on the enum `Azioni` will be removed. If these variants are still used in the database, this will fail.
  - Changed the column `azioni` on the `Intervento` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Azioni_new" AS ENUM ('PULIZIA', 'ANALISI_FUMI', 'GUASTO');
ALTER TABLE "Intervento" ALTER COLUMN "azioni" TYPE "Azioni_new"[] USING ("azioni"::text::"Azioni_new"[]);
ALTER TYPE "Azioni" RENAME TO "Azioni_old";
ALTER TYPE "Azioni_new" RENAME TO "Azioni";
DROP TYPE "Azioni_old";
COMMIT;

-- AlterTable
ALTER TABLE "Intervento" ALTER COLUMN "azioni" SET DATA TYPE "Azioni"[];
