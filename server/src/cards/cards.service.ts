import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';

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

    @Inject(forwardRef(() => LanguagesService))
    private languagesService: LanguagesService,
  ) {}

  async getCards(dto: FilterCardsDto): Promise<Card[]> {
    const { category, languageId } = dto;

    const language = await this.languagesService.getLanguageById(languageId);

    let cards = await this.cardRepository.find({
      where: {
        language: {
          id: language.id,
        },
      },
    });

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

  async deleteCardsByLanguage(languageId: string): Promise<void> {
    const language = await this.languagesService.getLanguageById(languageId);

    const languageCards = await this.cardRepository.findBy({
      language: {
        id: language.id,
      },
    });

    languageCards.forEach(async (languageCard) => {
      await this.deleteCard(languageCard.id);
    });
  }

  async updateCard(id: string, dto: UpdateCardDto): Promise<Card> {
    const card = await this.getCardById(id);

    const updatedCard = { ...card, ...dto };

    await this.cardRepository.save(updatedCard);

    return updatedCard;
  }
}
