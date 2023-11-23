import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Card } from './card.entity';

import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async getCards(): Promise<Card[]> {
    const cards = await this.cardRepository.find();

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
    const { word, translation, categories, notes } = dto;

    const card = this.cardRepository.create({
      word,
      translation,
      categories,
      notes,
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
