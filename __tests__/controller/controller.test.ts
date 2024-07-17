import { Controller, createController } from '@/controller';
import {
  mockData,
  MockEntity,
  mockHTTPRequest,
  mockHTTPResponse,
  mockNextFunction,
  mockResponse,
  mockService,
} from '__tests__/__mocks__';

describe('controller', () => {
  let testController: Controller<MockEntity>;

  beforeEach(() => {
    jest.clearAllMocks();
    testController = createController<MockEntity>(mockService);
  });

  it('should create a controller', async () => {
    expect(testController).toBeInstanceOf(Controller<MockEntity>);
    expect(testController).toHaveProperty('getAllItems');
    expect(testController).toHaveProperty('getItemById');
    expect(testController).toHaveProperty('getItemByWhere');
    expect(testController).toHaveProperty('createItem');
    expect(testController).toHaveProperty('createItems');
    expect(testController).toHaveProperty('updateItemById');
    expect(testController).toHaveProperty('deleteItemById');
  });

  describe('getAllItems', () => {
    it('given there are items, should get return items', async () => {
      await testController.getAllItems(mockHTTPRequest, mockHTTPResponse, mockNextFunction);
      expect(mockService.getAllItems).toHaveBeenCalled();
      expect(mockHTTPResponse.status).toHaveBeenCalledWith(200);
      expect(mockHTTPResponse.json).toHaveBeenCalledWith(mockResponse.formatted.all);
    });

    it('given there are no items, should return no content', async () => {
      mockService.getAllItems = jest.fn().mockResolvedValue(mockResponse.formatted.none);
      await testController.getAllItems(mockHTTPRequest, mockHTTPResponse, mockNextFunction);
      expect(mockService.getAllItems).toHaveBeenCalled();
      expect(mockHTTPResponse.status).toHaveBeenCalledWith(204);
      expect(mockHTTPResponse.json).toHaveBeenCalledWith(mockResponse.formatted.none);
    });
  });

  describe('getItemById', () => {
    it('given there is an item, should return item', async () => {
      mockHTTPRequest.params = { id: mockData.testItems[0].id };
      await testController.getItemById(mockHTTPRequest, mockHTTPResponse, mockNextFunction);
      expect(mockService.getItemById).toHaveBeenCalledWith(mockData.testItems[0].id);
      expect(mockHTTPResponse.status).toHaveBeenCalledWith(200);
      expect(mockHTTPResponse.json).toHaveBeenCalledWith({
        data: [mockResponse.formatted.all.data[0]],
      });
    });

    it('given there are no items, should return not found', async () => {
      mockHTTPRequest.params = { id: 'NOTtestUUID' };
      await testController.getItemById(mockHTTPRequest, mockHTTPResponse, mockNextFunction);
      expect(mockService.getItemById).toHaveBeenCalledWith('NOTtestUUID');
      expect(mockHTTPResponse.status).toHaveBeenCalledWith(404);
      expect(mockHTTPResponse.json).toHaveBeenCalledWith({ message: 'Item not found' });
    });
  });

  describe('getItemByWhere', () => {
    it('given there is an item, should return item', async () => {
      mockHTTPRequest.body = { where: { id: mockData.testItems[0].id } };
      mockService.getItemByWhere = jest.fn().mockResolvedValue({ data: [mockData.testItems[0]] });
      await testController.getItemByWhere(mockHTTPRequest, mockHTTPResponse, mockNextFunction);
      expect(mockService.getItemByWhere).toHaveBeenCalledWith({
        where: { id: mockData.testItems[0].id },
      });
      expect(mockHTTPResponse.status).toHaveBeenCalledWith(200);
      expect(mockHTTPResponse.json).toHaveBeenCalledWith({ data: [mockData.testItems[0]] });
    });

    it('given there are no items, should return not found', async () => {
      mockHTTPRequest.body = { where: { id: 'NotTestUUID' } };
      mockService.getItemByWhere = jest.fn().mockResolvedValue(mockResponse.formatted.none);
      await testController.getItemByWhere(mockHTTPRequest, mockHTTPResponse, mockNextFunction);
      expect(mockService.getItemByWhere).toHaveBeenCalledWith({ where: { id: 'NotTestUUID' } });
      expect(mockHTTPResponse.status).toHaveBeenCalledWith(404);
      expect(mockHTTPResponse.json).toHaveBeenCalledWith({ message: 'Item not found' });
    });
  });

  describe('createItem', () => {
    it('should return created item', async () => {
      mockHTTPRequest.body = { title: 'Test Title' };
      mockService.createItem = jest
        .fn()
        .mockResolvedValue({ data: [{ id: 'id11', title: 'Test Title' }] });
      await testController.createItem(mockHTTPRequest, mockHTTPResponse, mockNextFunction);
      expect(mockService.createItem).toHaveBeenCalledWith({ title: 'Test Title' });
      expect(mockHTTPResponse.status).toHaveBeenCalledWith(201);
      expect(mockHTTPResponse.json).toHaveBeenCalledWith({
        data: [{ id: 'id11', title: 'Test Title' }],
      });
    });
  });

  describe('createItems', () => {
    it('should return created items', async () => {
      mockHTTPRequest.body = [{ title: 'Test Title' }, { title: 'Test Title 2' }];
      mockService.createItems = jest.fn().mockResolvedValue({
        data: [
          { id: 'id11', title: 'Test Title' },
          { id: 'id22', title: 'Test Title 2' },
        ],
      });
      await testController.createItems(mockHTTPRequest, mockHTTPResponse, mockNextFunction);
      expect(mockService.createItems).toHaveBeenCalledWith([
        { title: 'Test Title' },
        { title: 'Test Title 2' },
      ]);
      expect(mockHTTPResponse.status).toHaveBeenCalledWith(201);
      expect(mockHTTPResponse.json).toHaveBeenCalledWith({
        data: [
          { id: 'id11', title: 'Test Title' },
          { id: 'id22', title: 'Test Title 2' },
        ],
      });
    });
  });

  describe('updateItemById', () => {
    it('given there is an item, should return item', async () => {
      mockHTTPRequest.params = { id: mockData.testItems[0].id };
      mockHTTPRequest.body = { title: 'Test Title' };
      mockService.updateItemById = jest
        .fn()
        .mockResolvedValue({ data: [{ ...mockData.testItems[0], title: 'Test Title' }] });
      await testController.updateItemById(mockHTTPRequest, mockHTTPResponse, mockNextFunction);
      expect(mockService.updateItemById).toHaveBeenCalledWith(mockData.testItems[0].id, {
        title: 'Test Title',
      });
      expect(mockHTTPResponse.status).toHaveBeenCalledWith(200);
      expect(mockHTTPResponse.json).toHaveBeenCalledWith({
        data: [{ ...mockData.testItems[0], title: 'Test Title' }],
      });
    });

    it('given there are no updateItemById, should return not found', async () => {
      mockHTTPRequest.params = { id: 'NotTestUUID' };
      mockHTTPRequest.body = { title: 'Test Title' };
      mockService.updateItemById = jest.fn().mockResolvedValue(mockResponse.formatted.none);
      await testController.updateItemById(mockHTTPRequest, mockHTTPResponse, mockNextFunction);
      expect(mockService.updateItemById).toHaveBeenCalledWith('NotTestUUID', {
        title: 'Test Title',
      });
      expect(mockHTTPResponse.status).toHaveBeenCalledWith(404);
      expect(mockHTTPResponse.json).toHaveBeenCalledWith({ message: 'Item not found' });
    });
  });

  describe('deleteItemById', () => {
    it('given there is an item, should return success message', async () => {
      mockHTTPRequest.params = { id: mockData.testItems[0].id };
      await testController.deleteItemById(mockHTTPRequest, mockHTTPResponse, mockNextFunction);
      expect(mockService.deleteItemById).toHaveBeenCalledWith(mockData.testItems[0].id);
      expect(mockHTTPResponse.status).toHaveBeenCalledWith(204);
      expect(mockHTTPResponse.json).toHaveBeenCalledWith({
        message: 'Item deleted successfully',
      });
    });
  });
});
