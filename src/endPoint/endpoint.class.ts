import { Controller, createController } from '@/controller';
import { BaseEntity } from '@/entities/BaseEntity.class';
import { createRepository, Repository } from '@/repository';
import { createRouter } from '@/router';
import { createService, Service } from '@/service';
import express from 'express';
import { DataSource } from 'typeorm';

export class Endpoint<TEntity extends BaseEntity> {
  router: express.Router;
  routes: express.Router;
  private repository: Repository<TEntity>;
  private service: Service<TEntity>;
  private controller: Controller<TEntity>;
  path: string;

  constructor(
    private readonly entity: TEntity,
    private readonly dataSource: DataSource,
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
