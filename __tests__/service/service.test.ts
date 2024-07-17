import { createService, Service } from '@/service';
import { mockData, MockEntity, mockRepository, mockResponse } from '__tests__/__mocks__';

describe('Service', () => {
  let testService: Service<MockEntity>;

  beforeEach(() => {
    jest.clearAllMocks();
    testService = createService<MockEntity>(mockRepository);
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

  describe('getAllItems', () => {
    it('should get all items', async () => {
      const allItems = await testService.getAllItems();
      expect(mockRepository.getAllItems).toHaveBeenCalled();
      expect(allItems).toEqual(mockResponse.formatted.all);
    });
  });

  describe('getItemById', () => {
    it('when exists should return the item', async () => {
      const itemById = await testService.getItemById(mockData.testItems[0].id);
      expect(mockRepository.getItemById).toHaveBeenCalledWith(mockData.testItems[0].id);
      expect(itemById).toEqual(mockResponse.formatted.single);
    });

    it('when does not exist should return', async () => {
      const itemById = await testService.getItemById('NOTtestUUID');
      expect(itemById).toEqual(mockResponse.formatted.none);
    });
  });

  describe('getItemByWhere', () => {
    it('when exists should return the item', async () => {
      const itemByWhere = await testService.getItemByWhere({ id: mockData.testItems[0].id });
      expect(mockRepository.getItemByWhere).toHaveBeenCalledWith({ id: mockData.testItems[0].id });
      expect(itemByWhere).toStrictEqual(mockResponse.formatted.single);
    });

    it('when does not exist should return', async () => {
      const itemByWhere = await testService.getItemByWhere({ id: 'NOTtestUUID' });
      expect(itemByWhere).toStrictEqual(mockResponse.formatted.none);
    });
  });

  describe('createItem', () => {
    it('should create an item', async () => {
      const createdItem = await testService.createItem(mockData.itemToCreate);
      expect(mockRepository.createItem).toHaveBeenCalledWith(mockData.itemToCreate);
      expect(createdItem).toStrictEqual(mockResponse.formatted.created);
    });
  });

  describe('createItems', () => {
    it('should create multiple items', async () => {
      const createdItems = await testService.createItems(mockData.itemsToCreate);
      expect(mockRepository.createItem).toHaveBeenCalledTimes(mockData.itemsToCreate.length);
      expect(createdItems).toEqual(mockResponse.formatted.multipleCreated);
    });
  });

  describe('updateItemById', () => {
    it('when item exists should return updated item', async () => {
      const updatedItem = await testService.updateItemById(
        mockData.testItems[0].id,
        mockData.itemToUpdate,
      );
      expect(mockRepository.updateItemById).toHaveBeenCalledWith(
        mockData.testItems[0].id,
        mockData.itemToUpdate,
      );
      expect(updatedItem).toStrictEqual(mockResponse.formatted.updated);
    });

    it('when item does not exist should return empty data', async () => {
      const updatedItem = await testService.updateItemById('NOTtestUUID', mockData.itemToUpdate);
      expect(updatedItem).toStrictEqual(mockResponse.formatted.none);
    });
  });

  describe('deleteItemById', () => {
    it('should delete an item by id', async () => {
      const deleteItemByIdResult = await testService.deleteItemById(mockData.testItems[0].id);
      expect(mockRepository.deleteItemById).toHaveBeenCalledWith(mockData.testItems[0].id);
      expect(deleteItemByIdResult).toStrictEqual(mockResponse.formatted.none);
    });
  });
});
