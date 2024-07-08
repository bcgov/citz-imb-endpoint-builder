// import { EntitySchema } from 'typeorm';
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

  public createItem: (_item: TEntity) => Promise<IFormattedResponse<TEntity>>;

  public createItems: (_items: TEntity[]) => Promise<IFormattedResponse<TEntity>>;

  public updateItemById: (_id: string, _item: TEntity) => Promise<IFormattedResponse<TEntity>>;

  public deleteItemById: (_id: string) => Promise<IFormattedResponse<TEntity>>;

  constructor(private readonly repository: Repository<TEntity>) {
    this.repository = repository;

    this.getAllItems = async () => {
      const response = await this.repository.getAllItems();
      return this.formatResponse(response as TEntity[]);
    };

    this.getItemById = async (id: string) => {
      const response = await this.repository.getItemById(id);
      return this.formatResponse(response as TEntity);
    };

    this.getItemByWhere = async (where: object) => {
      const response = await this.repository.getItemByWhere(where);
      return this.formatResponse(response as TEntity);
    };

    this.createItem = async (item: TEntity) => {
      const response = await this.repository.createItem(item);
      return this.formatResponse(response as TEntity);
    };

    this.createItems = async (items: TEntity[]) => {
      const responses: TEntity[] = [];

      for (let id = 0; id < items.length; id++) {
        const response = await this.repository.createItem(items[id]);
        responses.push(response as TEntity);
      }

      return this.formatResponse(responses);
    };

    this.updateItemById = async (id: string, item: TEntity) => {
      const response = await this.repository.updateItemById(id, item);
      return this.formatResponse(response as TEntity);
    };

    this.deleteItemById = async (id: string) => {
      const response = await this.repository.deleteItemById(id);
      return this.formatResponse(response as TEntity);
    };
  }
}
