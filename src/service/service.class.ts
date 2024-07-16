// import { EntitySchema } from 'typeorm';
import { TEntityWithoutId } from '@/types';
import type { Repository } from '../repository/repository.factory';

export interface IFormattedResponse<TEntity> {
  data: TEntity[];
}
export class Service<TEntity> {
  protected formatResponse = (data: TEntity | TEntity[] | null): IFormattedResponse<TEntity> => {
    if (data === null) data = [] as TEntity[];
    if (!Array.isArray(data)) data = [data] as TEntity[];

    return { data };
  };

  public getAllItems: () => Promise<IFormattedResponse<TEntity>>;

  public getItemById: (_id: string) => Promise<IFormattedResponse<TEntity>>;

  public getItemByWhere: (_where: object) => Promise<IFormattedResponse<TEntity>>;

  public createItem: (_item: TEntityWithoutId<TEntity>) => Promise<IFormattedResponse<TEntity>>;

  public createItems: (_items: TEntityWithoutId<TEntity>[]) => Promise<IFormattedResponse<TEntity>>;

  public updateItemById: (
    _id: string,
    _item: Partial<TEntity>,
  ) => Promise<IFormattedResponse<TEntity>>;

  public deleteItemById: (_id: string) => Promise<IFormattedResponse<TEntity>>;

  constructor(private readonly repository: Repository<TEntity>) {
    this.getAllItems = async () => {
      const allItems = await repository.getAllItems();
      return this.formatResponse(allItems);
    };

    this.getItemById = async (id) => {
      const itemById = await repository.getItemById(id);
      return this.formatResponse(itemById);
    };

    this.getItemByWhere = async (where) => {
      const itemByWhere = await repository.getItemByWhere(where);
      return this.formatResponse(itemByWhere);
    };

    this.createItem = async (item) => {
      const createdItem = await repository.createItem(item);
      return this.formatResponse(createdItem);
    };

    this.createItems = async (items) => {
      const createdItems: TEntity[] = [];

      if (Array.isArray(items)){
        for (let i = 0; i < items.length; i++) {
          const createdItem = await this.createItem(items[i]);
          createdItems.push(createdItem.data[0]);
        }
      }

      return this.formatResponse(createdItems);
    };

    this.updateItemById = async (id, item) => {
      const updatedItem = await repository.updateItemById(id, item);
      return this.formatResponse(updatedItem);
    };

    this.deleteItemById = async (id) => {
      const deletedItem = await repository.deleteItemById(id);
      return this.formatResponse(deletedItem);
    };
  }
}
