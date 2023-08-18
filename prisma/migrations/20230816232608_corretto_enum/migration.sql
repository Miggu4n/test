/*
  Warnings:

  - The values [CASA] on the enum `TipoContatto` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoContatto_new" AS ENUM ('FISSO', 'MOBILE', 'EMAIL');
ALTER TABLE "Contatto" ALTER COLUMN "tipo" TYPE "TipoContatto_new" USING ("tipo"::text::"TipoContatto_new");
ALTER TYPE "TipoContatto" RENAME TO "TipoContatto_old";
ALTER TYPE "TipoContatto_new" RENAME TO "TipoContatto";
DROP TYPE "TipoContatto_old";
COMMIT;
