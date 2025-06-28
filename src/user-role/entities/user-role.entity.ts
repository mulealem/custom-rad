// model UserRole {
//   id        Int      @id @default(autoincrement())
//   userId    Int
//   role      String
//   user      User     @relation(fields: [userId], references: [id])
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

export class UserRole {
  id: number;
  userId: number;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
