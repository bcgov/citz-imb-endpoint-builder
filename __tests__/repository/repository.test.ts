import { Repository, createRepository } from '@/repository';
import { mockDataSource, MockEntity, testItem, testItems, testUUID } from '__tests__/__mocks__';

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

  describe('getAllItems', () => {
    it('should get all items', async () => {
      const retrievedItems = await testRepository.getAllItems();

      expect(retrievedItems).toEqual(testItems);
    });
  });

  describe('getItemById', () => {
    it('when exists should return the item', async () => {
      const retrievedItem = await testRepository.getItemById(testUUID);

      expect(retrievedItem).toBe(testItem);
    });

    it('when does not exist should return null', async () => {
      const retrievedItem = await testRepository.getItemById('NOTtestUUID');

      expect(retrievedItem).toBeNull();
    });
  });

  describe('getItemByWhere', () => {
    it('when exists should return the item', async () => {
      const retrievedItem = await testRepository.getItemByWhere({ id: testUUID });

      expect(retrievedItem).toBe(testItem);
    });

    it('when does not exist should return null', async () => {
      const retrievedItem = await testRepository.getItemByWhere({ id: 'NOTtestUUID' });

      expect(retrievedItem).toBeNull();
    });
  });

  it('should create an item', async () => {
    const retrievedItem = await testRepository.createItem(testItem);

    expect(retrievedItem).toEqual(testItem);
  });

  describe('update an item by id', () => {
    it('when item exists should return updated item', async () => {
      const updatedItem = await testRepository.updateItemById(testUUID, {
        ...testItem,
        title: 'updated',
      });

      expect(updatedItem).toEqual({ ...testItem, title: 'updated' });
    });

    it('when item does not exist should return null', async () => {
      const updatedItem = await testRepository.updateItemById('NOTtestUUID', {
        ...testItem,
        title: 'updated',
      });

      expect(updatedItem).toBeNull();
    });
  });

  it('should delete an item by id', async () => {
    const deletedItem = await testRepository.deleteItemById(testUUID);

    expect(deletedItem).toBeNull();
  });
});
