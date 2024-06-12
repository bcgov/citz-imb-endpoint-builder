import { DataSource, ObjectLiteral } from 'typeorm';
import { Repository } from './repository.class';

export type { Repository };

export const createRepository = <TEntity extends ObjectLiteral>(
  entity: TEntity,
  dataSource: DataSource,
) => new Repository<ObjectLiteral>(entity, dataSource);
