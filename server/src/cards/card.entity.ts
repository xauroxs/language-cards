import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Language } from 'src/languages/language.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  word: string;

  @Column()
  translation: string;

  @Column('text', { array: true, nullable: true })
  categories: string[];

  @Column('text', { array: true, nullable: true })
  notes: string[];

  @ManyToOne(() => Language, (language) => language.cards, {
    eager: false,
    onDelete: 'CASCADE',
  })
  language: Language;
}
