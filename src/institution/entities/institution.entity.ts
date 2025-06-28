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

export class Institution {
  id: number;
  title?: string;
  abbreviation?: string;
  createdById?: number;
  createdAt: Date;
  updatedAt: Date;
}
