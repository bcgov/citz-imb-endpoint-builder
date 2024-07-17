export type TEntityWithoutId<TEntity> = Omit<TEntity, 'id' | 'lastUpdated' | 'createdOn'>;
