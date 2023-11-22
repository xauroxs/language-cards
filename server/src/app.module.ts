import { Module } from '@nestjs/common';

import { LanguagesModule } from './languages/languages.module';
import { LanguagesService } from './languages/languages.service';

@Module({
  imports: [LanguagesModule],
  controllers: [],
  providers: [LanguagesService],
})
export class AppModule {}
