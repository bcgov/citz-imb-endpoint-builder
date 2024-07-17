import { DataSource } from 'typeorm';
import { Repository } from './repository.class';

export type { Repository };

export const createRepository = <TEntity>(entity: TEntity, dataSource: DataSource) => {
  // console.log('createRepository', entity, dataSource);
  return new Repository<TEntity>(entity, dataSource);
};
