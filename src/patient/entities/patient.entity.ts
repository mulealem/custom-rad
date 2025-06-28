// model Patient {
//   id          Int      @id @default(autoincrement())
//   name        String
//   dateOfBirth DateTime
//   gender      String
//   createdById Int?
//   createdBy   User?    @relation(fields: [createdById], references: [id])
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
// }

export class Patient {
  id: number;
  name: string;
  dateOfBirth: Date; // Assuming dateOfBirth is a Date
  gender: string;
  createdById?: number;
  createdAt: Date;
  updatedAt: Date;
}
