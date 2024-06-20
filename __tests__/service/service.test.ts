import { Repository, createRepository } from '@/repository';
import { createService, Service, IFormattedResponse } from '@/service';
import { mockDataSource, MockEntity, testItem, testItems, testUUID } from '__tests__/__mocks__';
// import { EntitySchema } from 'typeorm';

describe('Service', () => {
  let testRepository: Repository<MockEntity>;
  let testService: Service<MockEntity>;
  let formattedResponseAll: IFormattedResponse<MockEntity>;
  let formattedResponseSingle: IFormattedResponse<MockEntity>;
  let formattedResponseEmpty: IFormattedResponse<MockEntity>;

  beforeEach(() => {
    jest.clearAllMocks();
    testRepository = createRepository<MockEntity>(new MockEntity(), mockDataSource);
    testService = createService<MockEntity>(testRepository);
    formattedResponseAll = { data: testItems };
    formattedResponseSingle = { data: [testItem] };
    formattedResponseEmpty = { data: [] };
  });

  it('should create a service', () => {
    expect(testService).toBeInstanceOf(Service<MockEntity>);
    expect(testService).toHaveProperty('getAllItems');
    expect(testService).toHaveProperty('getItemById');
    expect(testService).toHaveProperty('getItemByWhere');
    expect(testService).toHaveProperty('createItem');
    expect(testService).toHaveProperty('createItems');
    expect(testService).toHaveProperty('updateItemById');
    expect(testService).toHaveProperty('deleteItemById');
  });

  it('should get all items', async () => {
    const items = await testService.getAllItems();

    expect(items).toEqual(formattedResponseAll);
  });

  describe('getItemById', () => {
    it('when exists should return the item', async () => {
      const item = await testService.getItemById(testUUID);

      expect(item).toStrictEqual(formattedResponseSingle);
    });

    it('when does not exist should return', async () => {
      const item = await testService.getItemById('NOTtestUUID');

      expect(item).toStrictEqual(formattedResponseEmpty);
    });
  });

  describe('getItemByWhere', () => {
    it('when exists should return the item', async () => {
      const item = await testService.getItemByWhere({ id: testUUID });

      expect(item).toStrictEqual(formattedResponseSingle);
    });

    it('when does not exist should return', async () => {
      const item = await testService.getItemByWhere({ id: 'NOTtestUUID' });

      expect(item).toStrictEqual(formattedResponseEmpty);
    });
  });

  it('should create an item', async () => {
    const item = await testService.createItem(testItem);

    expect(item).toStrictEqual(formattedResponseSingle);
  });

  it('should create multiple items', async () => {
    const items = await testService.createItems(testItems);

    expect(items).toStrictEqual(formattedResponseAll);
  });

  describe('update an item by id', () => {
    it('when item exists should return updated item', async () => {
      const itemToUpdate = { ...testItem, title: 'updated' };
      const updatedItem = await testService.updateItemById(testUUID, itemToUpdate);

      const formattedUpdatedItem = { data: [itemToUpdate] };

      expect(updatedItem).toStrictEqual(formattedUpdatedItem);
    });

    it('when item does not exist should return empty data', async () => {
      const updatedItem = await testService.updateItemById('NOTtestUUID', {
        ...testItem,
        title: 'updated',
      });

      expect(updatedItem).toStrictEqual(formattedResponseEmpty);
    });
  });

  it('should delete an item by id', async () => {
    const result = await testService.deleteItemById(testUUID);

    expect(result).toStrictEqual(formattedResponseEmpty);
  });
});
