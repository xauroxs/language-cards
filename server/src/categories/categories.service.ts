import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from './category.entity';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find();

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
    const { name, color } = dto;

    const category = this.categoriesRepository.create({
      name,
      color,
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

  async updateCategory(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.getCategoryById(id);

    const { name, color } = dto;

    if (name) category.name = name;
    if (color) category.color = color;

    await this.categoriesRepository.save(category);

    return category;
  }
}
