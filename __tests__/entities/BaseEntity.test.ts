import { BaseEntity } from '@/entities/BaseEntity.class';

describe('BaseEntity', () => {
  let entity: BaseEntity;
  let now: Date;

  beforeEach(() => {
    entity = new BaseEntity();
    now = new Date();
  });

  it('should be able to create a new BaseEntity instance', () => {
    expect(entity).toBeInstanceOf(BaseEntity);
  });

  it('should be able to set and get id', () => {
    entity.id = 1;
    expect(entity.id).toBe(1);
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
