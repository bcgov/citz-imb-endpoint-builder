import { Endpoint } from '@/endPoint/endpoint.class';
import { createEndpoints } from '@/index';
import { DataSource } from 'typeorm';
import { MockEntity } from '../__mocks__/entity.mock';

describe('createEndpoints', () => {
  const dataSource = {} as DataSource;

  describe('default endpoints', () => {
    it('should create an endpoint with default values', () => {
      const endpoint = createEndpoints<MockEntity>({
        entity: MockEntity,
        dataSource,
      });

      // console.log('endpoint', endpoint);

      expect(endpoint).toBeInstanceOf(Endpoint);
    });
  });

  xdescribe('custom endpoints', () => {
    xit('should create an endpoint with default path', () => {
      // const endpoint = createEndpoints({
      //   entity,
      //   dataSource,
      // });
      // expect(endpoint).toBeInstanceOf(Endpoint);
    });
  });
});
