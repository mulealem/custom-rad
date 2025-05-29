import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  content: string;

  @IsString()
  @MinLength(10)
  referenceId: string;

  @IsString()
  @IsOptional()
  metadata?: string;
}
