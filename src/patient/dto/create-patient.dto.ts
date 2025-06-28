import { IsString, MinLength } from 'class-validator';

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

export class CreatePatientDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  dateOfBirth: string; // Assuming dateOfBirth is a string in ISO format

  @IsString()
  @MinLength(1)
  gender: string;
}
