-- AlterTable
ALTER TABLE "Study" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_assignedDoctorId_fkey" FOREIGN KEY ("assignedDoctorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
