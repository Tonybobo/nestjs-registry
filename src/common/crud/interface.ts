import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  FindOneOptions,
  SaveOptions,
  UpdateResult,
} from 'typeorm';

export abstract class IGenericRepository<Entity extends ObjectLiteral> {
  // Read
  abstract findAll(query?: FindOptionsWhere<Entity>): Promise<Entity[]>;
  abstract findOne(query?: FindOneOptions<Entity>): Promise<Entity>;
  abstract findOneBy(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<Entity | null>;
  // If entities do not exist in the database then inserts, otherwise updates.
  abstract save<T extends DeepPartial<Entity>>(
    entities: T[] | T,
    options?: SaveOptions,
  ): Promise<T[] | T>;

  abstract delete(query: FindOptionsWhere<Entity>): Promise<UpdateResult>;
}
