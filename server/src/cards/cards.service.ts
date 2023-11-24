import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { LanguagesService } from 'src/languages/languages.service';

import { Card } from './card.entity';

import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { FilterCardsDto } from './dto/filter-cards.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,

    private languagesService: LanguagesService,
  ) {}

  async getCards(dto: FilterCardsDto): Promise<Card[]> {
    const { category } = dto;

    let cards = await this.cardRepository.find();

    if (category) {
      cards = cards.filter((card) => card.categories.includes(category));
    }

    return cards;
  }

  async getCardById(id: string): Promise<Card> {
    const card = await this.cardRepository.findOneBy({ id });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found.`);
    }

    return card;
  }

  async createCard(dto: CreateCardDto): Promise<Card> {
    const { word, translation, categories, notes, languageId } = dto;

    const language = await this.languagesService.getLanguageById(languageId);

    const card = this.cardRepository.create({
      word,
      translation,
      categories,
      notes,
      language,
    });

    await this.cardRepository.save(card);

    return card;
  }

  async deleteCard(id: string): Promise<void> {
    const result = await this.cardRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Card with ID ${id} not found.`);
    }
  }

  async updateCard(id: string, dto: UpdateCardDto): Promise<Card> {
    const card = await this.getCardById(id);

    const updatedCard = { ...card, ...dto };

    await this.cardRepository.save(updatedCard);

    return updatedCard;
  }
}
