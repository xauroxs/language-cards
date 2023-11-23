import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { LanguagesService } from './languages.service';

import { Language } from './language.entity';

import { IdDto } from './dto/id.dto';
import { CreateLanguageDto } from './dto/create-language.dto';

@Controller('languages')
export class LanguagesController {
  constructor(private languagesService: LanguagesService) {}

  @Get()
  getAllLanguages(): Promise<Language[]> {
    return this.languagesService.getLanguages();
  }

  @Get(':id')
  getLanguageById(@Param() idDto: IdDto): Promise<Language> {
    const { id } = idDto;

    return this.languagesService.getLanguageById(id);
  }

  @Post()
  createLanguage(@Body() dto: CreateLanguageDto): Promise<Language> {
    return this.languagesService.createLanguage(dto);
  }

  @Delete(':id')
  deleteLanguage(@Param() idDto: IdDto): Promise<void> {
    const { id } = idDto;

    return this.languagesService.deleteLanguage(id);
  }

  @Patch(':id/name')
  updateLanguageName(
    @Param() idDto: IdDto,
    @Body('name') name: string,
  ): Promise<Language> {
    const { id } = idDto;

    return this.languagesService.updateLanguageName(id, name);
  }
}
