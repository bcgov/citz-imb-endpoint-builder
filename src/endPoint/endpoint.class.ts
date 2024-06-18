import { Controller, createController } from '@/controller';
import { createRouter } from '@/router';
import { createRepository, Repository } from '@/repository';
import express from 'express';
import { DataSource } from 'typeorm';
import { BaseEntity, createService, Service } from '..';

export class Endpoint<TEntity extends BaseEntity> {
  router: express.Router;
  routes: express.Router;
  repository: Repository<TEntity>;
  service: Service<TEntity>;
  controller: Controller<TEntity>;
  entity: TEntity;
  dataSource: DataSource;
  path: string;

  constructor(entity: TEntity, dataSource: DataSource) {
    this.entity = entity;
    this.path = entity.name.toLowerCase();
    this.dataSource = dataSource;
    this.repository = createRepository<TEntity>(entity, dataSource);
    this.service = createService<TEntity>(this.repository);
    this.controller = createController<TEntity>(this.service);
    this.router = createRouter<TEntity>(this.path, this.controller);
    this.routes = this.router;
  }
}
