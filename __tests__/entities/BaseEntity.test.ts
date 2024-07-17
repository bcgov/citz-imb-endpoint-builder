import { BaseEntity } from '@/entities/BaseEntity.class';

describe('BaseEntity', () => {
  let entity: BaseEntity;
  let now: Date;
  let uuid: string;

  beforeEach(() => {
    entity = new BaseEntity();
    now = new Date();
    uuid = '59667271-9089-497f-a46b-98e1a19380c9';
  });

  it('should be able to create a new BaseEntity instance', () => {
    expect(entity).toBeInstanceOf(BaseEntity);
  });

  it('should be able to set and get id', () => {
    entity.id = uuid;
    expect(entity.id).toBe(uuid);
  });

  it('should be able to set and get createdOn', () => {
    entity.createdOn = now;
    expect(entity.createdOn).toBe(now);
  });

  it('should be able to set and get lastUpdated', () => {
    entity.lastUpdated = now;
    expect(entity.lastUpdated).toBe(now);
  });
});
