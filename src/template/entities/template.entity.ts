// model Template {
//   id          Int      @id @default(autoincrement())
//   title       String
//   ordinal     Int      @default(0)
//   categoryId  Int
//   category    Category @relation(fields: [categoryId], references: [id])
//   createdById Int?
//   createdBy   User?    @relation(fields: [createdById], references: [id])
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
// }

import { Category, User } from '@prisma/client';

export class Template {
  id: number;
  title: string;
  ordinal: number = 0; // Default value
  categoryId: number;
  createdById?: number;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  category?: Category; // Assuming Category is defined elsewhere
  createdBy?: User; // Assuming User is defined elsewhere
}
