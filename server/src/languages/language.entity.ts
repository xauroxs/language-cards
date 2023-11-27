import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Card } from 'src/cards/card.entity';
import { Category } from 'src/categories/category.entity';

@Entity()
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Card, (card) => card.language, {
    eager: false,
    cascade: true,
  })
  cards: Card[];

  @OneToMany(() => Category, (category) => category.language, {
    eager: false,
    cascade: true,
  })
  categories: Category[];
}
