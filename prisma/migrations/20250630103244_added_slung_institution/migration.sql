/*
  Warnings:

  - A unique constraint covering the columns `[slung]` on the table `Institution` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Institution" ADD COLUMN     "slung" TEXT NOT NULL DEFAULT 'unknown-institution';

-- CreateIndex
CREATE UNIQUE INDEX "Institution_slung_key" ON "Institution"("slung");
