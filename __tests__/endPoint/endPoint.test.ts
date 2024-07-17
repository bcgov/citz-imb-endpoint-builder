import { Endpoint, createEndpoints } from '@/endPoint';
import { MockEntity, mockDataSource } from '__tests__/__mocks__';

describe('endPoint', () => {
  let endPoint: Endpoint<MockEntity>;

  beforeEach(() => {
    jest.clearAllMocks();
    endPoint = createEndpoints<MockEntity>({ entity: MockEntity, dataSource: mockDataSource });
  });

  it('should create an endpoint', () => {
    expect(endPoint).toBeInstanceOf(Endpoint);
    expect(endPoint).toHaveProperty('router');
    expect(endPoint).toHaveProperty('routes');
    expect(endPoint).toHaveProperty('repository');
    expect(endPoint).toHaveProperty('service');
    expect(endPoint).toHaveProperty('controller');
    expect(endPoint).toHaveProperty('entity');
    expect(endPoint).toHaveProperty('dataSource');
  });
});
