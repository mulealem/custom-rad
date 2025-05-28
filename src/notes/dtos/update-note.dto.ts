import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
