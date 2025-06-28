import { IsOptional, IsString, MinLength } from 'class-validator';

// model Department {
//   id           Int        @id @default(autoincrement())
//   title        String
//   abbreviation String?
//   description  String?
//   createdById  Int?
//   createdBy    User?      @relation(fields: [createdById], references: [id])
//   createdAt    DateTime   @default(now())
//   updatedAt    DateTime   @updatedAt
//   Category     Category[]
// }

export class CreateDepartmentDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @IsOptional()
  abbreviation?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

// API Request Sample (curl)
// curl -X POST http://localhost:3000/department \
// -H "Content-Type: application/json" \
// -d '{
//   "title": "New Department",
//   "abbreviation": "ND",
//   "description": "This is a new department"
// }'
