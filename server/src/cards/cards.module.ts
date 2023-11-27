import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LanguagesModule } from 'src/languages/languages.module';

import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';

import { Card } from './card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), LanguagesModule],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
