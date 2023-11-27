import { IsString, IsUUID } from 'class-validator';

export class DeleteCategoriesByLanguageDto {
  @IsString()
  @IsUUID('4')
  languageId: string;
}
