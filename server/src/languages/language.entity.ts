import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Card } from 'src/cards/card.entity';

@Entity()
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Card, (card) => card.language, { eager: false })
  cards: Card[];
}
