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
      const response = await service.getAllItems();

      if (Array.isArray(response.data) && response.data.length === 0)
        return res.status(HTTP_STATUS_CODES.NO_CONTENT).json(response);

      res.status(HTTP_STATUS_CODES.OK).json(response);
    });

    this.getItemById = errorWrapper(async (req: Request, res: Response) => {
      const response = await service.getItemById(req.params.id);

      if (Array.isArray(response.data) && response.data.length === 0)
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });

      res.status(HTTP_STATUS_CODES.OK).json(response);
    });

    this.getItemByWhere = errorWrapper(async (req: Request, res: Response) => {
      const response = await service.getItemByWhere(req.body);

      if (Array.isArray(response.data) && response.data.length === 0)
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

      if (Array.isArray(response.data) && response.data.length === 0)
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });

      res.status(HTTP_STATUS_CODES.OK).json(response);
    });

    this.deleteItemById = errorWrapper(async (req: Request, res: Response) => {
      await service.deleteItemById(req.params.id);

      res.status(HTTP_STATUS_CODES.NO_CONTENT).json({ message: 'Item deleted successfully' });
    });
  }
}
