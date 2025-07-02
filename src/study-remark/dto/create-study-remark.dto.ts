// model StudyAttachment {
//   id          Int      @id @default(autoincrement())
//   studyId     Int
//   study       Study    @relation(fields: [studyId], references: [id])
//   fileName    String
//   filePath    String
//   fileType    String
//   fileSize    Int
//   createdById Int?
//   createdBy   User?    @relation(fields: [createdById], references: [id])
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
// }

export class CreateStudyRemarkDto {
  studyId: number;
  remarkType: string;
  content: string;
}
