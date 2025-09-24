import { IsOptional, IsString, MinLength } from 'class-validator';

// model Institution {
//   id           Int      @id @default(autoincrement())
//   title        String?
//   slung        String   @unique @default(cuid())
//   abbreviation String?
//   logo         String?
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
  slung?: string;

  @IsString()
  @IsOptional()
  abbreviation?: string;

  @IsString()
  @IsOptional()
  logo?: string;
}
