import { Repository, createRepository } from '@/repository';
import { mockDataSource, mockData, MockEntity } from '__tests__/__mocks__';

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
    expect(mockDataSource.getRepository).toHaveBeenCalled();
  });

  describe('getAllItems', () => {
    it('should get all items', async () => {
      const allItems = await testRepository.getAllItems();
      expect(allItems).toEqual(mockData.testItems);
    });
  });

  describe('getItemById', () => {
    it('when exists should return the item', async () => {
      const retrievedItem = await testRepository.getItemById(mockData.testItems[0].id);
      expect(retrievedItem).toBe(mockData.testItems[0]);
    });

    it('when does not exist should return null', async () => {
      const retrievedItem = await testRepository.getItemById('NOTtestUUID');
      expect(retrievedItem).toBeNull();
    });
  });

  describe('getItemByWhere', () => {
    it('when exists should return the item', async () => {
      const retrievedItem = await testRepository.getItemByWhere({ id: mockData.testItems[0].id });
      expect(retrievedItem).toBe(mockData.testItems[0]);
    });

    it('when does not exist should return null', async () => {
      const retrievedItem = await testRepository.getItemByWhere({ id: 'NOTtestUUID' });
      expect(retrievedItem).toBeNull();
    });
  });

  describe('createItem', () => {
    it('should create and return item', async () => {
      const createdItem = await testRepository.createItem(mockData.itemToCreate);
      expect(createdItem).toEqual(mockData.createdItem);
    });
  });

  describe('update an item by id', () => {
    it('when item exists should return updated item', async () => {
      const updatedItem = await testRepository.updateItemById(mockData.testItems[0].id, {
        title: 'updated',
      });
      expect(updatedItem).toEqual({ ...mockData.testItems[0], title: 'updated' });
    });

    it('when item does not exist should return null', async () => {
      const updatedItem = await testRepository.updateItemById('NOTtestUUID', {
        title: 'updated',
      });
      expect(updatedItem).toBeNull();
    });
  });

  describe('deleteItemById', () => {
    it('should delete an item by id', async () => {
      const deletedItem = await testRepository.deleteItemById(mockData.testItems[0].id);
      expect(deletedItem).toBeNull();
    });
  });
});
