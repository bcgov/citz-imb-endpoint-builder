import { HTTP_STATUS_CODES, errorWrapper } from '@bcgov/citz-imb-express-utilities';
import { NextFunction, Request, Response } from 'express';
import { Service } from '../service/service.class';

export class Controller<TEntity> {
  getAllItems: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;

  getItemById: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;

  getItemByWhere: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;

  createItem: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;

  createItems: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;

  updateItemById: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;

  deleteItemById: (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;

  constructor(service: Service<TEntity>) {
    this.getAllItems = errorWrapper(async (req: Request, res: Response) => {
      const allItems = await service.getAllItems();

      if (Array.isArray(allItems.data) && allItems.data.length === 0)
        return res.status(HTTP_STATUS_CODES.NO_CONTENT).json(allItems);

      res.status(HTTP_STATUS_CODES.OK).json(allItems);
    });

    this.getItemById = errorWrapper(async (req: Request, res: Response) => {
      const item = await service.getItemById(req.params.id);

      if (!item) return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });

      res.status(HTTP_STATUS_CODES.OK).json(item);
    });

    this.getItemByWhere = errorWrapper(async (req: Request, res: Response) => {
      const item = await service.getItemByWhere(req.body);

      if (!item) return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });

      res.status(HTTP_STATUS_CODES.OK).json(item);
    });

    this.createItem = errorWrapper(async (req: Request, res: Response) => {
      const createdItem = await service.createItem(req.body);

      res.status(HTTP_STATUS_CODES.CREATED).json(createdItem);
    });

    this.createItems = errorWrapper(async (req: Request, res: Response) => {
      const createdItems = await service.createItems(req.body);

      res.status(HTTP_STATUS_CODES.CREATED).json(createdItems);
    });

    this.updateItemById = errorWrapper(async (req: Request, res: Response) => {
      const updatedItem = await service.updateItemById(req.params.id, req.body);

      if (!updatedItem)
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });

      res.status(HTTP_STATUS_CODES.OK).json(updatedItem);
    });

    this.deleteItemById = errorWrapper(async (req: Request, res: Response) => {
      await service.deleteItemById(req.params.id);

      res.status(HTTP_STATUS_CODES.NO_CONTENT).json({ message: 'Item deleted successfully' });
    });
  }
}
