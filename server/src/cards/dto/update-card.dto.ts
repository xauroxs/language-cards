import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCardDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  word?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  translation?: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  categories?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  notes?: string[];
}
