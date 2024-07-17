import { DataSource } from 'typeorm';
import { mockData } from './item.mock';

export const mockDataSource = {
  getRepository: jest.fn(() => {
    return {
      find: jest.fn(() => mockData.testItems),
      findOne: jest.fn(
        (query) => mockData.testItems.find((item) => item.id === query.where.id) || null,
      ),
      save: jest.fn((item) =>
        item.id ? { ...mockData.updatedItem, ...item } : mockData.createdItem,
      ),
      delete: jest.fn(() => null),
    };
  }),
} as unknown as DataSource;
