/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DeepPartial,
  SelectQueryBuilder,
  Repository,
  EntityManager,
} from 'typeorm';
import { getResolver } from './reflect';

/**
 * Defines a resolver callback.
 */
export interface Resolver<Entity extends {} = any> {
  (
    repository: Repository<Entity>,
    values: DeepPartial<Entity>,
  ): SelectQueryBuilder<Entity>;
}

/**
 * Resolves an entity instance for a fixture.
 * If an entity has been found, the loaded entity is merged with the
 * fixture and returned, otherwise the fixture itself is returned.
 *
 * @param manager EntityManager.
 * @param fixture Fixture.
 */
export async function resolve(
  manager: EntityManager,
  fixture: any,
): Promise<any> {
  const repository = manager.getRepository(fixture.constructor);
  const resolver = getResolver(fixture);

  if (resolver !== undefined) {
    const resolved = await resolver(repository, fixture).getOne();

    if (resolved !== undefined) {
      fixture = repository.merge(resolved, fixture);
    }
  }

  return fixture;
}
