import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardsModule } from 'src/cards/cards.module';
import { CategoriesModule } from 'src/categories/categories.module';

import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';

import { Language } from './language.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Language]),
    forwardRef(() => CardsModule),
    forwardRef(() => CategoriesModule),
  ],
  providers: [LanguagesService],
  controllers: [LanguagesController],
  exports: [LanguagesService],
})
export class LanguagesModule {}
