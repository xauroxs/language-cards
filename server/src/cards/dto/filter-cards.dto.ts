import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterCardsDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category?: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  languageId: string;
}
