import { DataSource } from 'typeorm';
import { Repository } from './repository.class';

export type { Repository };

export const createRepository = <TEntity>(entity: TEntity, dataSource: DataSource) =>
  new Repository<TEntity>(entity, dataSource);
