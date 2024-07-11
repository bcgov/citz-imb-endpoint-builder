import { MockEntity } from './entity.mock';
import { Repository } from '@/repository';
import { mockData } from './item.mock';

export const mockRepository = {
  getAllItems: jest.fn().mockResolvedValue(mockData.testItems),
  getItemById: jest.fn(async (id) => {
    return mockData.testItems.find((item) => item.id === id) || null;
  }),
  getItemByWhere: jest.fn((where) => {
    return mockData.testItems.find((item) => item.id === where.id) || null;
  }),
  createItem: jest.fn().mockResolvedValue(mockData.createdItem),
  updateItemById: jest.fn((id, item) => {
    return mockData.testItems.find((item) => item.id === id)
      ? {
          ...mockData.updatedItem,
          id,
          ...item,
        }
      : null;
  }),
  deleteItemById: jest.fn().mockResolvedValue(null),
} as unknown as Repository<MockEntity>;
