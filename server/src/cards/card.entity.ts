import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
