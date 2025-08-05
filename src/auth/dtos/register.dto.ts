import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  // fullName        String?
  // phoneNumber     String?
  // profilePicture  String?

  @IsString()
  fullName: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  profilePicture: string;
}
