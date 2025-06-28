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

export class Department {
  id: number;
  title: string;
  abbreviation?: string;
  description?: string;
  createdById?: number;
  createdAt: Date;
  updatedAt: Date;
  // Category?: Category[]; // Uncomment if you want to include categories in the department entity
}
