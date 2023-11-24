import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';

import { Language } from './language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  providers: [LanguagesService],
  controllers: [LanguagesController],
  exports: [LanguagesService],
})
export class LanguagesModule {}
