import { DataSource, EntityTarget, Repository as ORMRepository, ObjectLiteral } from 'typeorm';

export class Repository<TEntity extends ObjectLiteral> {
  private repository: ORMRepository<TEntity>;

  getAllItems: () => Promise<TEntity[]>;

  getItemById: (_id: string) => Promise<TEntity | null>;

  getItemByWhere: (_where: object) => Promise<TEntity | null>;

  createItem: (_item: TEntity) => Promise<TEntity>;

  updateItem: (_id: string, _item: TEntity) => Promise<TEntity | undefined>;

  deleteItem: (_id: string) => Promise<void>;

  constructor(entity: TEntity, dataSource: DataSource) {
    this.repository = dataSource.getRepository(entity as unknown as EntityTarget<TEntity>);

    this.getAllItems = async () => await this.repository.find();

    this.getItemById = async (id) => await this.repository.findOne({ where: { id } } as object);

    this.getItemByWhere = async (where) => await this.repository.findOne({ where });

    this.createItem = async (item) => await this.repository.save(item);

    this.updateItem = async (id, item) => {
      const existingItem = await this.repository.findOne({ where: { id } } as object);
      if (!existingItem) return undefined;
      Object.assign(existingItem, item);
      return await this.repository.save(existingItem);
    };

    this.deleteItem = async (id) => {
      await this.repository.delete(id);
    };
  }
}
