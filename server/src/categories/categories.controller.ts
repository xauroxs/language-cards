import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Category } from './category.entity';

import { CategoriesService } from './categories.service';

import { IdDto } from './dto/id.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FilterCategoriesDto } from './dto/filter-categories.dto';
import { DeleteCategoriesByLanguageDto } from './dto/delete-categories-by-language.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(@Body() dto: FilterCategoriesDto): Promise<Category[]> {
    return this.categoriesService.getCategories(dto);
  }

  @Get(':id')
  getCategoryById(@Param() idDto: IdDto): Promise<Category> {
    const { id } = idDto;

    return this.categoriesService.getCategoryById(id);
  }

  @Post()
  createCategory(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.createCategory(dto);
  }

  @Delete(':id')
  deleteCategory(@Param() idDto: IdDto): Promise<void> {
    const { id } = idDto;

    return this.categoriesService.deleteCategory(id);
  }

  @Delete()
  deleteCategoriesByLanguage(
    @Body() languageIdDto: DeleteCategoriesByLanguageDto,
  ): Promise<void> {
    const { languageId } = languageIdDto;

    return this.categoriesService.deleteCategoriesByLanguage(languageId);
  }

  @Put(':id')
  updateCategory(
    @Param() idDto: IdDto,
    @Body() dto: UpdateCategoryDto,
  ): Promise<Category> {
    const { id } = idDto;

    return this.categoriesService.updateCategory(id, dto);
  }
}
