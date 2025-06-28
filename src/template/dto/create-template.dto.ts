import { IsInt, IsString, MinLength } from 'class-validator';

// model Template {
//   id          Int      @id @default(autoincrement())
//   title       String
//   ordinal     Int      @default(0)
//   content     String
//   categoryId  Int
//   category    Category @relation(fields: [categoryId], references: [id])
//   createdById Int?
//   createdBy   User?    @relation(fields: [createdById], references: [id])
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
// }

export class CreateTemplateDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsInt()
  @MinLength(1)
  categoryId: number;

  @IsString()
  @MinLength(1)
  content: string;
}

// api request sample (curl)

// curl -X POST http://localhost:3000/template \
// -H "Content-Type: application/json" \
// -d '{
//   "title": "New Template",
//   "categoryId": 1,
//   "content": "This is the content of the new template"
// }'
