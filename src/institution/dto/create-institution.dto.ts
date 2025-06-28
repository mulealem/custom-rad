import { IsOptional, IsString, MinLength } from 'class-validator';

// model Institution {
//   id           Int      @id @default(autoincrement())
//   title        String?
//   abbreviation String?
//   createdById  Int?
//   createdBy    User?    @relation(fields: [createdById], references: [id])
//   createdAt    DateTime @default(now())
//   updatedAt    DateTime @updatedAt
//   Study        Study[]
// }

export class CreateInstitutionDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @IsOptional()
  abbreviation?: string;
}
