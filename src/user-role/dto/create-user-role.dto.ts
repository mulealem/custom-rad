import { IsInt, IsString, MinLength } from 'class-validator';

// model UserRole {
//   id        Int      @id @default(autoincrement())
//   userId    Int
//   role      String
//   user      User     @relation(fields: [userId], references: [id])
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

export class CreateUserRoleDto {
  @IsInt()
  @MinLength(1)
  userId: number;

  @IsString()
  @MinLength(1)
  role: string;
}
