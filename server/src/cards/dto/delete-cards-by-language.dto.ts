import { IsString, IsUUID } from 'class-validator';

export class DeleteCardsByLanguageDto {
  @IsString()
  @IsUUID('4')
  languageId: string;
}
