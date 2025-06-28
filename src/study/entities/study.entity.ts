// model Study {
//   id                         Int          @id @default(autoincrement())
//   studyId                    String?      @unique
//   studyDIACOMReferenceObject String?
//   patientId                  Int?
//   modality                   String?
//   referringPhysicianId       Int?
//   assignedDoctorId           Int?
//   status                     String?
//   content                    String?
//   institutionId              Int?
//   institution                Institution? @relation(fields: [institutionId], references: [id])
//   uploadedById               Int?
//   uploadedBy                 User?        @relation(fields: [uploadedById], references: [id])
//   createdAt                  DateTime     @default(now())
//   updatedAt                  DateTime     @updatedAt
//   StudyTag                   StudyTag[]
// }

export class Study {
  id: number;
  studyId?: string;
  studyDIACOMReferenceObject?: string;
  patientId?: number;
  modality?: string;
  referringPhysicianId?: number;
  assignedDoctorId?: number;
  status?: string;
  content: string;
  institutionId?: number;
  uploadedById?: number;
  createdAt: Date;
  updatedAt: Date;
}
