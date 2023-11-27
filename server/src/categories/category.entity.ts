import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Language } from 'src/languages/language.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @ManyToOne(() => Language, (language) => language.categories, {
    eager: false,
    onDelete: 'CASCADE',
  })
  language: Language;
}
