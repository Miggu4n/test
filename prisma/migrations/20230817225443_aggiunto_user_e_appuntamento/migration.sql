-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'TECNICO', 'IMPIEGATO');

-- CreateEnum
CREATE TYPE "TipoAppuntamento" AS ENUM ('GUASTO', 'MANUTENZIONE', 'COLLAUDO', 'ALTRO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cognome" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appuntamento" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "durata" INTEGER NOT NULL,
    "note" TEXT,
    "tipo" "TipoAppuntamento" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Appuntamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_nome_key" ON "User"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Appuntamento_id_key" ON "Appuntamento"("id");

-- AddForeignKey
ALTER TABLE "Appuntamento" ADD CONSTRAINT "Appuntamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
