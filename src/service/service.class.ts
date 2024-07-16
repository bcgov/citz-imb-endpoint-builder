// import { EntitySchema } from 'typeorm';
import { TEntityWithoutId } from '@/types';
import type { Repository } from '../repository/repository.factory';
import { FindOptionsWhere } from 'typeorm';

export interface IFormattedResponse<TEntity> {
  data: TEntity[];
}
export class Service<TEntity> {
  protected formatResponse = (data: TEntity | TEntity[] | null): IFormattedResponse<TEntity> => {
    if (data === null) data = [] as TEntity[];
    if (!Array.isArray(data)) data = [data] as TEntity[];

    return { data };
  };

  constructor(private readonly repository: Repository<TEntity>) {
    this.repository = repository;
  }

  getAllItems = async () => {
    const allItems = await this.repository.getAllItems();
    return this.formatResponse(allItems);
  };

  getItemById = async (id: string) => {
    const itemById = await this.repository.getItemById(id);
    return this.formatResponse(itemById);
  };

  getItemByWhere = async (where: FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[]) => {
    const itemByWhere = await this.repository.getItemByWhere(where);
    return this.formatResponse(itemByWhere);
  };

  createItem = async (item: TEntityWithoutId<TEntity>) => {
    const createdItem = await this.repository.createItem(item);
    return this.formatResponse(createdItem);
  };

  createItems = async (items: TEntityWithoutId<TEntity>[]) => {
    const createdItems: TEntity[] = [];

    if (Array.isArray(items)) {
      for (const item of items) {
        const createdItem = await this.createItem(item);
        createdItems.push(createdItem.data[0]);
      }
    }

    return this.formatResponse(createdItems);
  };

  updateItemById = async (id: string, item: Partial<TEntity>) => {
    const updatedItem = await this.repository.updateItemById(id, item);
    return this.formatResponse(updatedItem);
  };

  deleteItemById = async (id: string) => {
    const deletedItem = await this.repository.deleteItemById(id);
    return this.formatResponse(deletedItem);
  };
}
