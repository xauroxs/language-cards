import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';

import { Language } from './language.entity';

import { CardsService } from 'src/cards/cards.service';
import { CategoriesService } from 'src/categories/categories.service';

import { CreateLanguageDto } from './dto/create-language.dto';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,

    @Inject(forwardRef(() => CardsService))
    private cardsService: CardsService,

    @Inject(forwardRef(() => CategoriesService))
    private categoriesService: CategoriesService,
  ) {}

  async getLanguages(): Promise<Language[]> {
    const languages = await this.languageRepository.find();

    return languages;
  }

  async getLanguageById(id: string): Promise<Language> {
    const language = await this.languageRepository.findOneBy({ id });

    if (!language) {
      throw new NotFoundException(`Language with ID ${id} not found.`);
    }

    return language;
  }

  async createLanguage(dto: CreateLanguageDto): Promise<Language> {
    const { name } = dto;

    const language = this.languageRepository.create({ name });

    await this.languageRepository.save(language);

    return language;
  }

  async deleteLanguage(id: string): Promise<void> {
    await this.cardsService.deleteCardsByLanguage(id);
    await this.categoriesService.deleteCategoriesByLanguage(id);

    const result = await this.languageRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Language with ID ${id} not found.`);
    }
  }

  async updateLanguageName(id: string, name: string): Promise<Language> {
    const language = await this.getLanguageById(id);

    language.name = name;

    await this.languageRepository.save(language);

    return language;
  }
}
