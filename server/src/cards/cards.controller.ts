import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CardsService } from './cards.service';

import { Card } from './card.entity';

import { IdDto } from './dto/id.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  getCards(): Promise<Card[]> {
    return this.cardsService.getCards();
  }

  @Get(':id')
  getCardById(@Param() idDto: IdDto): Promise<Card> {
    const { id } = idDto;

    return this.cardsService.getCardById(id);
  }

  @Post()
  createCard(@Body() dto: CreateCardDto): Promise<Card> {
    return this.cardsService.createCard(dto);
  }

  @Delete(':id')
  deleteCard(@Param() idDto: IdDto): Promise<void> {
    const { id } = idDto;

    return this.cardsService.deleteCard(id);
  }

  @Put(':id')
  updateCard(@Param() idDto: IdDto, @Body() dto: UpdateCardDto): Promise<Card> {
    const { id } = idDto;

    return this.cardsService.updateCard(id, dto);
  }
}
