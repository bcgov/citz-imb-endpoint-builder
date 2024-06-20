import { DataSource, EntitySchema, Repository as ORMRepository } from 'typeorm';

export class Repository<TEntity> {
  private repository: ORMRepository<EntitySchema<TEntity>>;

  public getAllItems: () => Promise<TEntity[]>;

  public getItemById: (_id: string) => Promise<TEntity | null>;

  public getItemByWhere: (_where: object) => Promise<TEntity | null>;

  public createItem: (_item: TEntity) => Promise<TEntity>;

  public updateItemById: (_id: string, _item: TEntity) => Promise<TEntity | null>;

  deleteItemById: (_id: string) => Promise<null>;

  constructor(
    private readonly entity: TEntity,
    private readonly dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(entity as EntitySchema<TEntity>) as ORMRepository<
      EntitySchema<TEntity>
    >;

    this.getAllItems = async () => (await this.repository.find()) as TEntity[];

    this.getItemById = async (id) => {
      const result = await this.repository.findOne({ where: { id } } as object);
      if (!result) return null;
      return result as TEntity;
    };

    this.getItemByWhere = async (where) => {
      const result = await this.repository.findOne({ where });
      if (!result) return null;
      return result as TEntity;
    };

    this.createItem = async (item) =>
      (await this.repository.save(item as EntitySchema<TEntity>)) as TEntity;

    this.updateItemById = async (id, item) => {
      const existingItem = await this.repository.findOne({ where: { id } } as object);

      if (!existingItem) return null;

      Object.assign(existingItem, item);
      return (await this.repository.save(existingItem)) as TEntity;
    };

    this.deleteItemById = async (id) => {
      await this.repository.delete(id);
      return null;
    };
  }
}
