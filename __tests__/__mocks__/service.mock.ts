import { Service } from '@/service';
import { MockEntity } from './entity.mock';
import { mockResponse } from './item.mock';

export const mockService = {
  getAllItems: jest.fn().mockResolvedValue(mockResponse.formatted.all),
  getItemById: jest.fn((id) => {
    const foundItem = mockResponse.formatted.all.data.find((item) => item.id === id);
    return foundItem ? { data: [foundItem] } : { data: [] };
  }),
  getItemByWhere: jest.fn(),
  createItem: jest.fn(),
  createItems: jest.fn(),
  updateItemById: jest.fn(),
  deleteItemById: jest.fn(),
} as unknown as Service<MockEntity>;
