import { IFormattedResponse } from '@/service';
import { MockEntity } from './entity.mock';
import { TEntityWithoutId } from '@/types';

const now: Date = new Date();

export const mockData: {
  now: Date;
  testItems: MockEntity[];
  itemToCreate: TEntityWithoutId<MockEntity>;
  createdItem: MockEntity;
  itemToUpdate: TEntityWithoutId<MockEntity>;
  updatedItem: MockEntity;
  itemsToCreate: TEntityWithoutId<MockEntity>[];
} = {
  now,
  testItems: [
    {
      id: 'uuid-special-1',
      title: 'test-1',
      createdOn: now,
      lastUpdated: now,
    },
    {
      id: 'uuid-special-2',
      title: 'test-2',
      createdOn: now,
      lastUpdated: now,
    },
  ],
  itemToCreate: { title: 'test-3' },
  createdItem: {
    id: 'uuid-special-3',
    title: 'test-3',
    createdOn: now,
    lastUpdated: now,
  },
  itemToUpdate: { title: 'test-update' },
  updatedItem: {
    id: 'updated-uuid-special',
    title: 'test-update',
    createdOn: now,
    lastUpdated: now,
  },
  itemsToCreate: [{ title: 'test-4' }, { title: 'test-5' }],
};

export const mockResponse: {
  formatted: {
    all: IFormattedResponse<MockEntity>;
    single: IFormattedResponse<MockEntity>;
    none: IFormattedResponse<MockEntity>;
    created: IFormattedResponse<MockEntity>;
    updated: IFormattedResponse<MockEntity>;
    multipleCreated: IFormattedResponse<MockEntity>;
  };
} = {
  formatted: {
    all: { data: mockData.testItems },
    single: { data: [mockData.testItems[0]] },
    none: { data: [] },
    created: {
      data: [mockData.createdItem],
    },
    multipleCreated: {
      data: [mockData.createdItem, mockData.createdItem],
    },
    updated: {
      data: [{ ...mockData.testItems[0], ...mockData.itemToUpdate }],
    },
  },
};
