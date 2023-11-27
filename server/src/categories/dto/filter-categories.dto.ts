import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FilterCategoriesDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  languageId: string;
}
