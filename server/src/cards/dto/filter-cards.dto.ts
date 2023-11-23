import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterCardsDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category?: string;
}
