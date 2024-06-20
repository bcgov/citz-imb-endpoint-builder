import { MockEntity } from './entity.mock';

export const now: Date = new Date();
export const testUUID: string = 'uuid-special-1';
export const testItem: MockEntity = {
  id: testUUID,
  title: 'test',
  createdOn: now,
  lastUpdated: now,
};
export const testItems: MockEntity[] = [
  testItem,
  {
    id: 'uuid-special-2',
    title: 'test-2',
    createdOn: now,
    lastUpdated: now,
  },
];
