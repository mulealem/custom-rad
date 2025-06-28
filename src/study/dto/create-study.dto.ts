import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

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

export class CreateStudyDto {
  @IsString()
  @MinLength(1)
  studyId: string;

  @IsString()
  @MinLength(1)
  modality: string;

  @IsString()
  @MinLength(1)
  status: string;

  @IsString()
  content: string;

  @IsInt()
  @IsOptional()
  patientId?: number;

  @IsString()
  @IsOptional()
  referringPhysicianId?: number;

  @IsInt()
  @IsOptional()
  assignedDoctorId?: number;

  @IsInt()
  @IsOptional()
  institutionId?: number;

  @IsInt()
  @IsOptional()
  uploadedById?: number;

  @IsString()
  @IsOptional()
  studyDIACOMReferenceObject?: string;
}
