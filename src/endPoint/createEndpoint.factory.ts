import { BaseEntity } from '..';
import { Endpoint } from './endpoint.class';
import { DataSource } from 'typeorm';

export interface createEndpointProps<TEntity> {
  entity: TEntity;
  dataSource: DataSource;
}

export const createEndpoints = <TEntity extends BaseEntity>(
  props: createEndpointProps<TEntity>,
) => {
  const endpoints = new Endpoint(props.entity, props.dataSource);

  return endpoints;
};
