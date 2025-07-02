-- CreateTable
CREATE TABLE "StudyRemark" (
    "id" SERIAL NOT NULL,
    "studyId" INTEGER NOT NULL,
    "remarkType" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudyRemark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyAttachment" (
    "id" SERIAL NOT NULL,
    "studyId" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudyAttachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudyRemark" ADD CONSTRAINT "StudyRemark_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyRemark" ADD CONSTRAINT "StudyRemark_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyAttachment" ADD CONSTRAINT "StudyAttachment_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyAttachment" ADD CONSTRAINT "StudyAttachment_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
