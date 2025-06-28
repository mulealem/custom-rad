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

export class Category {
  id: number;
  title: string;
  abbreviation?: string;
  departmentId: number;
  createdById?: number;
  createdAt: Date;
  updatedAt: Date;
}

// api request sample (curl)
// curl -X POST http://localhost:3000/category \
// -H "Content-Type: application/json" \
// -d '{
//   "title": "New Category",
//   "abbreviation": "NC",
//   "departmentId": 1
// }'
