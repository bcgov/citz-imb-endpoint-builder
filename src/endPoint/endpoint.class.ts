import { Controller, createController } from '@/controller';
import { createRouter } from '@/router';
import { createRepository, Repository } from '@/repository';
import express from 'express';
import { DataSource } from 'typeorm';
import { BaseEntity, createService, Service } from '..';

export class Endpoint<TEntity extends BaseEntity> {
  router: express.Router;
  routes: express.Router;
  private repository: Repository<TEntity>;
  private service: Service<TEntity>;
  private controller: Controller<TEntity>;
  path: string;

  constructor(
    private entity: TEntity,
    private dataSource: DataSource,
  ) {
    this.entity = entity;
    this.path = entity.constructor.name.toLowerCase();
    this.dataSource = dataSource;
    this.repository = createRepository<TEntity>(entity, dataSource);
    this.service = createService<TEntity>(this.repository);
    this.controller = createController<TEntity>(this.service);
    this.router = createRouter<TEntity>(this.path, this.controller);
    this.routes = this.router;
  }
}
