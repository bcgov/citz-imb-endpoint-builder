// import { IFormattedResponse } from '@/service';
import { MockEntity } from './entity.mock';
import { TEntityWithoutId } from '@/types';

const now: Date = new Date();

// const testItemToUpdate: MockEntity = {
//   ...testItem,
//   title: 'test-update',
// };
// const updatedItem: MockEntity = {
//   id: testUUID,
//   title: 'test-update',
//   createdOn: now,
//   lastUpdated: now,
// };

const testItems: MockEntity[] = [
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
];
// const createItemUUID_1: string = 'uuid-special-3';
// const createItemUUID_2: string = 'uuid-special-4';
// const createItem_1: MockEntity = {
//   id: createItemUUID_1,
//   title: 'test-3',
//   createdOn: now,
//   lastUpdated: now,
// };

export const mockData: {
  now: Date;
  testItems: MockEntity[];
  itemToCreate: TEntityWithoutId<MockEntity>;
  createdItem: MockEntity;
  // itemToUpdate: MockEntity;
  updatedItem: MockEntity;
  // itemsToCreate: TEntityWithoutId<MockEntity>[];
} = {
  now,
  testItems,
  itemToCreate: { title: 'test-3' },
  createdItem: {
    id: 'uuid-special-3',
    title: 'test-3',
    createdOn: now,
    lastUpdated: now,
  },
  // itemToUpdate: testItemToUpdate,
  updatedItem: {
    id: 'updated-uuid-special',
    title: 'test-update',
    createdOn: now,
    lastUpdated: now,
  },
  // itemsToCreate: [{ title: 'test-4' }, { title: 'test-5' }],
};

export const mockResponse: {
  formatted: {
    // all: IFormattedResponse<MockEntity>;
    // single: IFormattedResponse<MockEntity>;
    // none: IFormattedResponse<MockEntity>;
    // created: IFormattedResponse<MockEntity>;
    // updated: IFormattedResponse<MockEntity>;
    // multipleCreated: IFormattedResponse<MockEntity>;
  };
} = {
  formatted: {
    // all: { data: mockData.allItems },
    // single: { data: [mockData.item] },
    // none: { data: [] },
    // created: {
    //   data: [mockData.createdItem],
    // },
    // updated: { data: [mockData.itemToUpdate] },
  },
};
