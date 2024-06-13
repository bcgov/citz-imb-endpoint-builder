import { createController } from '@/controller';
import { createRouter } from '@/router';
import { createRepository } from '@/repository';
import express from 'express';
import { DataSource } from 'typeorm';
import { createService } from '..';

export class Endpoint<TEntity> {
  routes: express.Router;

  constructor(entity: TEntity, dataSource: DataSource) {
    const dataRepository = createRepository<TEntity>(entity, dataSource);
    const dataService = createService<TEntity>(dataRepository);
    const dataController = createController<TEntity>(dataService);
    const router = createRouter<TEntity>(dataController);

    this.routes = router;
  }
}
