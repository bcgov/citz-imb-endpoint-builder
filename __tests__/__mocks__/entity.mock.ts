import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/entities/BaseEntity.class';

@Entity()
export class MockEntity extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  title!: string;
}
