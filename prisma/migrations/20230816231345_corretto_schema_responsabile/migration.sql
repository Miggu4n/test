-- AlterTable
ALTER TABLE "Responsabile" ALTER COLUMN "codice_fiscale" DROP NOT NULL,
ALTER COLUMN "partita_iva" DROP NOT NULL,
ALTER COLUMN "ragione_sociale" DROP NOT NULL,
ALTER COLUMN "codice_univoco" DROP NOT NULL,
ALTER COLUMN "annotazioni" DROP NOT NULL;
