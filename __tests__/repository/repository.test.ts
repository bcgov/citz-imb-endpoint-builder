import { Repository, createRepository } from '@/repository';
import { mockDataSource, MockEntity, testItem, testItems, testUUID } from '__tests__/__mocks__';
import { EntitySchema } from 'typeorm';

describe('Repository', () => {
  let testRepository: Repository<MockEntity>;

  beforeEach(() => {
    jest.clearAllMocks();
    testRepository = createRepository<MockEntity>(new MockEntity(), mockDataSource);
  });

  it('should create a repository', () => {
    expect(testRepository).toBeInstanceOf(Repository<MockEntity>);
    expect(testRepository).toHaveProperty('getAllItems');
    expect(testRepository).toHaveProperty('getItemById');
    expect(testRepository).toHaveProperty('getItemByWhere');
    expect(testRepository).toHaveProperty('createItem');
    expect(testRepository).toHaveProperty('updateItemById');
    expect(testRepository).toHaveProperty('deleteItemById');
  });

  it('should get all items', async () => {
    const items = await testRepository.getAllItems();

    expect(items).toEqual(testItems);
  });

  describe('getItemById', () => {
    it('when exists should return the item', async () => {
      const item = await testRepository.getItemById(testUUID);

      expect(item).toBe(testItem);
    });

    it('when does not exist should return', async () => {
      const item = await testRepository.getItemById('NOTtestUUID');

      expect(item).toBeNull();
    });
  });

  describe('getItemByWhere', () => {
    it('when exists should return the item', async () => {
      const item = await testRepository.getItemByWhere({ id: testUUID });

      expect(item).toBe(testItem);
    });

    it('when does not exist should return', async () => {
      const item = await testRepository.getItemByWhere({ id: 'NOTtestUUID' });

      expect(item).toBeNull();
    });
  });

  it('should create an item', async () => {
    const item = await testRepository.createItem(testItem as unknown as EntitySchema<MockEntity>);

    expect(item).toEqual(testItem);
  });

  describe('update an item by id', () => {
    it('when item exists should return updated item', async () => {
      const updatedItem = await testRepository.updateItemById(testUUID, {
        title: 'updated',
      } as unknown as EntitySchema<MockEntity>);

      expect(updatedItem).toEqual({ ...testItem, title: 'updated' });
    });

    it('when item does not exist should return null', async () => {
      const updatedItem = await testRepository.updateItemById('NOTtestUUID', {
        title: 'updated',
      } as unknown as EntitySchema<MockEntity>);

      expect(updatedItem).toBeNull();
    });
  });

  it('should delete an item by id', async () => {
    const result = await testRepository.deleteItemById(testUUID);

    expect(result).toBeNull();
  });
});
