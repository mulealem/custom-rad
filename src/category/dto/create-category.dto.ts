import { IsOptional, IsString, MinLength } from 'class-validator';

// model Category {
//   id           Int        @id @default(autoincrement())
//   title        String
//   abbreviation String?
//   departmentId Int
//   department   Department @relation(fields: [departmentId], references: [id])
//   createdById  Int?
//   createdBy    User?      @relation(fields: [createdById], references: [id])
//   createdAt    DateTime   @default(now())
//   updatedAt    DateTime   @updatedAt
//   Template     Template[]
// }

export class CreateCategoryDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @IsOptional()
  abbreviation?: string;

  departmentId: number;
}
