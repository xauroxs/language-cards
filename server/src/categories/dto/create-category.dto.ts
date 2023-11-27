import { IsHexColor, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  languageId: string;
}
