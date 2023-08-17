/*
  Warnings:

  - A unique constraint covering the columns `[impiantoId]` on the table `Ubicazione` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ubicazione_impiantoId_key" ON "Ubicazione"("impiantoId");
