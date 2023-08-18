/*
  Warnings:

  - A unique constraint covering the columns `[id_old]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codiceConferma]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codiceConferma` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_old` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ruolo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_nome_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "codiceConferma" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id_old" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN DEFAULT false,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "ruolo" "UserRole" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_id_old_key" ON "User"("id_old");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_codiceConferma_key" ON "User"("codiceConferma");
