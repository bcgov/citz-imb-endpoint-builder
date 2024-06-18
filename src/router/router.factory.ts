import express from 'express';
import { Controller } from '@/controller';
import { BaseEntity } from '..';

export const createRouter = <TEntity extends BaseEntity>(
  path: string,
  dataController: Controller<TEntity>,
) => {
  const router = express.Router();

  router.get(`${path}/`, dataController.getAllItems);
  router.get(`${path}/:id`, dataController.getItemById);
  router.post(`${path}/`, dataController.createItem);
  router.put(`${path}/:id`, dataController.updateItemById);
  router.delete(`${path}/:id`, dataController.deleteItemById);

  return router;
};
