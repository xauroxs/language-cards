import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  word: string;

  @IsString()
  @IsNotEmpty()
  translation: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty()
  categories: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  notes: string[];

  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  languageId: string;
}
