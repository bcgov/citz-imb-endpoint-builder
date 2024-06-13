// import { Controller } from '@/controller';
// import { Service } from '@/service';
import { Endpoint } from './endpoint.class';
// import { Repository } from '@/repository';
import { DataSource } from 'typeorm';

export interface createEndpointProps<TEntity> {
  // dataRepository: Repository<TEntity>;
  entity: TEntity;
  // dataService: Service<TEntity>;
  // dataController: Controller<TEntity>;
  dataSource: DataSource;
  // entities?: EntitySchema[];
}

export const createEndpoints = <TEntity>(props: createEndpointProps<TEntity>) => {
  const endpoints = new Endpoint(props.entity, props.dataSource);

  return endpoints;
};
