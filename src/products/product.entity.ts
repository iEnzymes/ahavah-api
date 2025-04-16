import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductTag } from './product-tags.entity';
import { Collection } from 'src/collections/collections.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  label: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  price: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  collectionId: string;

  @ManyToOne(() => Collection, (collection) => collection.product, {
    nullable: false,
  })
  collection: Collection;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.product, {
    nullable: false,
  })
  user: User;

  @OneToMany(() => ProductTag, (tag) => tag.product, {
    cascade: true,
  })
  tags: ProductTag[];
}
