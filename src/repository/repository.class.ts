import { DataSource, EntitySchema, Repository as ORMRepository } from 'typeorm';

export class Repository<TEntity> {
  private repository: ORMRepository<EntitySchema<TEntity>>;

  public getAllItems: () => Promise<EntitySchema<TEntity>[]>;

  public getItemById: (_id: string) => Promise<EntitySchema<TEntity> | null>;

  public getItemByWhere: (_where: object) => Promise<EntitySchema<TEntity> | null>;

  public createItem: (_item: EntitySchema<TEntity>) => Promise<EntitySchema<TEntity>>;

  public updateItemById: (
    _id: string,
    _item: EntitySchema<TEntity>,
  ) => Promise<EntitySchema<TEntity> | null>;

  deleteItemById: (_id: string) => Promise<null>;

  constructor(
    private readonly entity: TEntity,
    private readonly dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(entity as EntitySchema<TEntity>) as ORMRepository<
      EntitySchema<TEntity>
    >;

    this.getAllItems = async () => await this.repository.find();

    this.getItemById = async (id) => await this.repository.findOne({ where: { id } } as object);

    this.getItemByWhere = async (where) => await this.repository.findOne({ where });

    this.createItem = async (item) => await this.repository.save(item as EntitySchema<TEntity>);

    this.updateItemById = async (id, item) => {
      const existingItem = await this.repository.findOne({ where: { id } } as object);

      if (!existingItem) return null;

      Object.assign(existingItem, item);
      return await this.repository.save(existingItem);
    };

    this.deleteItemById = async (id) => {
      await this.repository.delete(id);
      return null;
    };
  }
}
