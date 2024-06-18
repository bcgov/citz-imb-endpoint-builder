import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  name!: string;

  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @CreateDateColumn()
  createdOn!: Date;

  @UpdateDateColumn()
  lastUpdated!: Date;
}
