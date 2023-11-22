import { Module } from '@nestjs/common';

import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';

@Module({
  providers: [LanguagesService],
  controllers: [LanguagesController],
})
export class LanguagesModule {}
