import { TEntityWithoutId } from '@/types';
import { DataSource, EntitySchema, FindOptionsWhere, Repository as ORMRepository } from 'typeorm';

export class Repository<TEntity> {
  private repository: ORMRepository<EntitySchema<TEntity>>;

  constructor(
    private readonly entity: TEntity,
    private readonly dataSource: DataSource,
  ) {
    this.entity = entity;
    this.dataSource = dataSource;
    this.repository = this.dataSource.getRepository(
      this.entity as EntitySchema<TEntity>,
    ) as ORMRepository<EntitySchema<TEntity>>;
  }

  public getAllItems = async () => (await this.repository.find()) as TEntity[];

  public getItemById = async (id: string) => {
    const findOneResult = await this.repository.findOne({ where: { id } } as object);
    if (!findOneResult) return null;
    return findOneResult as TEntity;
  };

  getItemByWhere = async (where: FindOptionsWhere<TEntity>[] | FindOptionsWhere<TEntity>) => {
    const findOneResult = await this.repository.findOne({ where });
    if (!findOneResult) return null;
    return findOneResult as TEntity;
  };

  createItem = async (item: TEntityWithoutId<TEntity>) =>
    (await this.repository.save(item)) as TEntity;

  updateItemById = async (id: string, item: Partial<TEntity>) => {
    const findOneResult = await this.repository.findOne({ where: { id } } as object);

    if (!findOneResult) return null;

    Object.assign(findOneResult, item);
    return (await this.repository.save(findOneResult)) as TEntity;
  };

  deleteItemById = async (id: string) => {
    await this.repository.delete(id);
    return null;
  };
}
