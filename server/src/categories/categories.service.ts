import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';

import { LanguagesService } from 'src/languages/languages.service';

import { Category } from './category.entity';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FilterCategoriesDto } from './dto/filter-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,

    @Inject(forwardRef(() => LanguagesService))
    private languagesService: LanguagesService,
  ) {}

  async getCategories(dto: FilterCategoriesDto): Promise<Category[]> {
    const { languageId } = dto;

    const language = await this.languagesService.getLanguageById(languageId);

    const categories = await this.categoriesRepository.find({
      where: {
        language: {
          id: language.id,
        },
      },
    });

    return categories;
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const { name, color, languageId } = dto;

    const language = await this.languagesService.getLanguageById(languageId);

    const category = this.categoriesRepository.create({
      name,
      color,
      language,
    });

    await this.categoriesRepository.save(category);

    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    const result = await this.categoriesRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  async deleteCategoriesByLanguage(languageId: string): Promise<void> {
    const language = await this.languagesService.getLanguageById(languageId);

    const languageCategories = await this.categoriesRepository.findBy({
      language: {
        id: language.id,
      },
    });

    languageCategories.forEach(async (languageCategory) => {
      await this.deleteCategory(languageCategory.id);
    });
  }

  async updateCategory(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.getCategoryById(id);

    const { name, color } = dto;

    if (name) category.name = name;
    if (color) category.color = color;

    await this.categoriesRepository.save(category);

    return category;
  }
}
