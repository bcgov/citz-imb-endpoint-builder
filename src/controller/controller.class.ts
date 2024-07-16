import { HTTP_STATUS_CODES, errorWrapper } from '@bcgov/citz-imb-express-utilities';
import { NextFunction, Request, Response } from 'express';
import { Service } from '../service/service.class';

export class Controller<TEntity> {
  public getAllItems: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;

  public getItemById: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;

  public getItemByWhere: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;

  public createItem: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;

  public createItems: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;

  public updateItemById: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;

  public deleteItemById: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;

  private hasNoContent = (data: TEntity | TEntity[] | null): boolean =>
    Array.isArray(data) && data.length === 0;

  constructor(private readonly service: Service<TEntity>) {
    this.getAllItems = errorWrapper(async (req: Request, res: Response) => {
      const allItems = await service.getAllItems();

      if (this.hasNoContent(allItems.data))
        return res.status(HTTP_STATUS_CODES.NO_CONTENT).json(allItems);

      res.status(HTTP_STATUS_CODES.OK).json(allItems);
    });

    this.getItemById = errorWrapper(async (req: Request, res: Response) => {
      const itemById = await service.getItemById(req.params.id);

      if (this.hasNoContent(itemById.data))
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });

      res.status(HTTP_STATUS_CODES.OK).json(itemById);
    });

    this.getItemByWhere = errorWrapper(async (req: Request, res: Response) => {
      const response = await service.getItemByWhere(req.body);

      if (this.hasNoContent(response.data))
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });

      res.status(HTTP_STATUS_CODES.OK).json(response);
    });

    this.createItem = errorWrapper(async (req: Request, res: Response) => {
      const response = await service.createItem(req.body);

      res.status(HTTP_STATUS_CODES.CREATED).json(response);
    });

    this.createItems = errorWrapper(async (req: Request, res: Response) => {
      const response = await service.createItems(req.body);

      res.status(HTTP_STATUS_CODES.CREATED).json(response);
    });

    this.updateItemById = errorWrapper(async (req: Request, res: Response) => {
      const response = await service.updateItemById(req.params.id, req.body);

      if (this.hasNoContent(response.data))
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });

      res.status(HTTP_STATUS_CODES.OK).json(response);
    });

    this.deleteItemById = errorWrapper(async (req: Request, res: Response) => {
      await service.deleteItemById(req.params.id);

      res.status(HTTP_STATUS_CODES.NO_CONTENT).json({ message: 'Item deleted successfully' });
    });
  }
}
