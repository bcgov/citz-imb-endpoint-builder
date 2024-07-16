import { HTTP_STATUS_CODES, errorWrapper } from '@bcgov/citz-imb-express-utilities';
import { Request, Response } from 'express';
import { Service } from '../service/service.class';

export class Controller<TEntity> {
  private hasNoContent = (data: TEntity | TEntity[] | null): boolean =>
    Array.isArray(data) && data.length === 0;

  constructor(private readonly service: Service<TEntity>) {
    this.service = service;
  }

  public getAllItems = errorWrapper(async (req: Request, res: Response) => {
    const allItems = await this.service.getAllItems();

    if (this.hasNoContent(allItems.data))
      return res.status(HTTP_STATUS_CODES.NO_CONTENT).json(allItems);

    res.status(HTTP_STATUS_CODES.OK).json(allItems);
  });

  getItemById = errorWrapper(async (req: Request, res: Response) => {
    const itemById = await this.service.getItemById(req.params.id);

    if (this.hasNoContent(itemById.data))
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });

    res.status(HTTP_STATUS_CODES.OK).json(itemById);
  });

  getItemByWhere = errorWrapper(async (req: Request, res: Response) => {
    const response = await this.service.getItemByWhere(req.body);

    if (this.hasNoContent(response.data))
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });

    res.status(HTTP_STATUS_CODES.OK).json(response);
  });

  createItem = errorWrapper(async (req: Request, res: Response) => {
    const response = await this.service.createItem(req.body);

    res.status(HTTP_STATUS_CODES.CREATED).json(response);
  });

  createItems = errorWrapper(async (req: Request, res: Response) => {
    const response = await this.service.createItems(req.body);

    res.status(HTTP_STATUS_CODES.CREATED).json(response);
  });

  updateItemById = errorWrapper(async (req: Request, res: Response) => {
    const response = await this.service.updateItemById(req.params.id, req.body);

    if (this.hasNoContent(response.data))
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });

    res.status(HTTP_STATUS_CODES.OK).json(response);
  });

  deleteItemById = errorWrapper(async (req: Request, res: Response) => {
    await this.service.deleteItemById(req.params.id);

    res.status(HTTP_STATUS_CODES.NO_CONTENT).json({ message: 'Item deleted successfully' });
  });
}
