import { DataSource } from 'typeorm';
import { testItem, testItems } from './item.mock';

export const mockDataSource = {
  getRepository: jest.fn(() => {
    return {
      find: jest.fn(() => testItems),
      findOne: jest.fn((query) => (testItem.id === query.where.id ? testItem : null)),
      save: jest.fn((item) => item),
      delete: jest.fn(() => null),
    };
  }),
} as unknown as DataSource;
