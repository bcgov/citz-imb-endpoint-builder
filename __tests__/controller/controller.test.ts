import { Controller, createController } from '@/controller';
import { IFormattedResponse, Service } from '@/service';
import { MockEntity, testItem, testItems, testUUID } from '__tests__/__mocks__';
import { Request, Response } from 'express';

describe('controller', () => {
  let testController: Controller<MockEntity>;
  let formattedResponseAll: IFormattedResponse<MockEntity>;
  let formattedResponseSingle: IFormattedResponse<MockEntity>;
  let formattedResponseEmpty: IFormattedResponse<MockEntity>;

  const mockRequest = {} as Request;
  const mockResponse = {
    send: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const NextFunction = jest.fn();
  const mockService = {
    getAllItems: jest.fn(),
    getItemById: jest.fn(),
    getItemByWhere: jest.fn(),
    createItem: jest.fn(),
    createItems: jest.fn(),
    updateItemById: jest.fn(),
    deleteItemById: jest.fn(),
  } as unknown as Service<MockEntity>;

  beforeEach(() => {
    jest.clearAllMocks();
    testController = createController<MockEntity>(mockService);
    formattedResponseAll = { data: testItems };
    formattedResponseSingle = { data: [testItem] };
    formattedResponseEmpty = { data: [] };
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
      mockService.getAllItems = jest.fn().mockResolvedValue({ data: [...testItems] });

      await testController.getAllItems(mockRequest, mockResponse, NextFunction);

      expect(mockService.getAllItems).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(formattedResponseAll);
    });

    it('given there are no items, should return no content', async () => {
      mockService.getAllItems = jest.fn().mockResolvedValue({ data: [] });

      await testController.getAllItems(mockRequest, mockResponse, NextFunction);

      expect(mockService.getAllItems).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.json).toHaveBeenCalledWith(formattedResponseEmpty);
    });
  });

  describe('getItemById', () => {
    it('given there is an item, should return item', async () => {
      mockRequest.params = { id: testUUID };
      mockService.getItemById = jest.fn().mockResolvedValue({ data: [testItem] });

      await testController.getItemById(mockRequest, mockResponse, NextFunction);

      expect(mockService.getItemById).toHaveBeenCalledWith(testUUID);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(formattedResponseSingle);
    });

    it('given there are no items, should return not found', async () => {
      mockRequest.params = { id: 'NotTestUUID' };
      mockService.getItemById = jest.fn().mockResolvedValue({ data: [] });

      await testController.getItemById(mockRequest, mockResponse, NextFunction);

      expect(mockService.getItemById).toHaveBeenCalledWith('NotTestUUID');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Item not found' });
    });
  });

  describe('getItemByWhere', () => {
    it('given there is an item, should return item', async () => {
      mockRequest.body = { where: { id: testUUID } };
      mockService.getItemByWhere = jest.fn().mockResolvedValue({ data: [testItem] });

      await testController.getItemByWhere(mockRequest, mockResponse, NextFunction);

      expect(mockService.getItemByWhere).toHaveBeenCalledWith({ where: { id: testUUID } });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(formattedResponseSingle);
    });

    it('given there are no items, should return not found', async () => {
      mockRequest.body = { where: { id: 'NotTestUUID' } };
      mockService.getItemByWhere = jest.fn().mockResolvedValue({ data: [] });

      await testController.getItemByWhere(mockRequest, mockResponse, NextFunction);

      expect(mockService.getItemByWhere).toHaveBeenCalledWith({ where: { id: 'NotTestUUID' } });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Item not found' });
    });
  });

  describe('createItem', () => {
    it('given there is an item, should return item', async () => {
      mockRequest.body = { title: 'Test Title' };
      mockService.createItem = jest
        .fn()
        .mockResolvedValue({ data: [{ id: 'id11', title: 'Test Title' }] });

      await testController.createItem(mockRequest, mockResponse, NextFunction);

      expect(mockService.createItem).toHaveBeenCalledWith({ title: 'Test Title' });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [{ id: 'id11', title: 'Test Title' }],
      });
    });
  });

  describe('updateItemById', () => {
    it('given there is an item, should return item', async () => {
      mockRequest.params = { id: testUUID };
      mockRequest.body = { title: 'Test Title' };
      mockService.updateItemById = jest
        .fn()
        .mockResolvedValue({ data: [{ ...testItem, title: 'Test Title' }] });

      await testController.updateItemById(mockRequest, mockResponse, NextFunction);

      expect(mockService.updateItemById).toHaveBeenCalledWith(testUUID, { title: 'Test Title' });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [{ ...testItem, title: 'Test Title' }],
      });
    });

    it('given there are no updateItemById, should return not found', async () => {
      mockRequest.params = { id: 'NotTestUUID' };
      mockRequest.body = { title: 'Test Title' };
      mockService.updateItemById = jest.fn().mockResolvedValue(formattedResponseEmpty);

      await testController.updateItemById(mockRequest, mockResponse, NextFunction);

      expect(mockService.updateItemById).toHaveBeenCalledWith('NotTestUUID', {
        title: 'Test Title',
      });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Item not found' });
    });
  });

  describe('deleteItemById', () => {
    it('given there is an item, should return success message', async () => {
      mockRequest.params = { id: testUUID };

      await testController.deleteItemById(mockRequest, mockResponse, NextFunction);

      expect(mockService.deleteItemById).toHaveBeenCalledWith(testUUID);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Item deleted successfully',
      });
    });
  });
});
