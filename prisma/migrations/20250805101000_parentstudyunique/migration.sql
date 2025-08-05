/*
  Warnings:

  - A unique constraint covering the columns `[parentStudyReferenceId]` on the table `Study` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Study_parentStudyReferenceId_key" ON "Study"("parentStudyReferenceId");
