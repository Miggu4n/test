-- CreateEnum
CREATE TYPE "TipoContatto" AS ENUM ('CASA', 'MOBILE', 'EMAIL');

-- CreateEnum
CREATE TYPE "Azioni" AS ENUM ('PULIZIA', 'ANALISI_FUMI', 'GUASTO', 'COLLAUDO');

-- CreateTable
CREATE TABLE "Responsabile" (
    "id" TEXT NOT NULL,
    "codice_fiscale" TEXT NOT NULL,
    "cognome" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "partita_iva" TEXT NOT NULL,
    "ragione_sociale" TEXT NOT NULL,
    "codice_univoco" TEXT NOT NULL,
    "annotazioni" TEXT NOT NULL,

    CONSTRAINT "Responsabile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Impianto" (
    "id" TEXT NOT NULL,
    "targa" TEXT,
    "codice_impianto" TEXT,
    "responsabileId" TEXT NOT NULL,

    CONSTRAINT "Impianto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contatto" (
    "id" TEXT NOT NULL,
    "tipo" "TipoContatto" NOT NULL,
    "valore" TEXT NOT NULL,
    "note" TEXT,
    "responsabileId" TEXT NOT NULL,

    CONSTRAINT "Contatto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ubicazione" (
    "id" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "comune" TEXT NOT NULL,
    "cap" TEXT NOT NULL,
    "localita" TEXT,
    "indirizzo" TEXT NOT NULL,
    "civico" TEXT NOT NULL,
    "piano" TEXT,
    "interno" TEXT,
    "scala" TEXT,
    "maps" TEXT,
    "note" TEXT,
    "impiantoId" TEXT NOT NULL,

    CONSTRAINT "Ubicazione_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Generatore" (
    "id" TEXT NOT NULL,
    "modello" TEXT,
    "matricola" TEXT NOT NULL,
    "formula_comfort" BOOLEAN NOT NULL DEFAULT false,
    "collaudo" TIMESTAMP(3) NOT NULL,
    "idraulico" TEXT,
    "causale_installazione" TEXT,
    "impiantoId" TEXT,

    CONSTRAINT "Generatore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intervento" (
    "id" SERIAL NOT NULL,
    "azioni" "Azioni" NOT NULL,
    "data_intervento" TIMESTAMP(3) NOT NULL,
    "annotazioni" TEXT NOT NULL,
    "generatoreId" TEXT,

    CONSTRAINT "Intervento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Responsabile_id_key" ON "Responsabile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Responsabile_codice_fiscale_key" ON "Responsabile"("codice_fiscale");

-- CreateIndex
CREATE UNIQUE INDEX "Responsabile_partita_iva_key" ON "Responsabile"("partita_iva");

-- CreateIndex
CREATE UNIQUE INDEX "Responsabile_codice_univoco_key" ON "Responsabile"("codice_univoco");

-- CreateIndex
CREATE UNIQUE INDEX "Impianto_id_key" ON "Impianto"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Impianto_targa_key" ON "Impianto"("targa");

-- CreateIndex
CREATE UNIQUE INDEX "Impianto_codice_impianto_key" ON "Impianto"("codice_impianto");

-- CreateIndex
CREATE UNIQUE INDEX "Contatto_id_key" ON "Contatto"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ubicazione_id_key" ON "Ubicazione"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Generatore_id_key" ON "Generatore"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Generatore_matricola_key" ON "Generatore"("matricola");

-- CreateIndex
CREATE UNIQUE INDEX "Intervento_id_key" ON "Intervento"("id");

-- AddForeignKey
ALTER TABLE "Impianto" ADD CONSTRAINT "Impianto_responsabileId_fkey" FOREIGN KEY ("responsabileId") REFERENCES "Responsabile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contatto" ADD CONSTRAINT "Contatto_responsabileId_fkey" FOREIGN KEY ("responsabileId") REFERENCES "Responsabile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ubicazione" ADD CONSTRAINT "Ubicazione_impiantoId_fkey" FOREIGN KEY ("impiantoId") REFERENCES "Impianto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Generatore" ADD CONSTRAINT "Generatore_impiantoId_fkey" FOREIGN KEY ("impiantoId") REFERENCES "Impianto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervento" ADD CONSTRAINT "Intervento_generatoreId_fkey" FOREIGN KEY ("generatoreId") REFERENCES "Generatore"("id") ON DELETE SET NULL ON UPDATE CASCADE;
