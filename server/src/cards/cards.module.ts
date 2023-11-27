import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LanguagesModule } from 'src/languages/languages.module';

import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';

import { Card } from './card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    forwardRef(() => LanguagesModule),
  ],
  providers: [CardsService],
  controllers: [CardsController],
  exports: [CardsService],
})
export class CardsModule {}
