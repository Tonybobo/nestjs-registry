import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
  UpdateResult,
} from 'typeorm';
import { IGenericRepository } from './interface';
import { isArray } from 'class-validator';

export class BaseRepository<Entity> implements IGenericRepository<Entity> {
  private _repository: Repository<Entity>;

  constructor(repository: Repository<Entity>) {
    this._repository = repository;
  }

  findAll(query?: FindOptionsWhere<Entity>): Promise<Entity[]> {
    return this._repository.find(query);
  }

  findOne(query?: FindOneOptions<Entity>): Promise<Entity> {
    return this._repository.findOne(query);
  }

  save<T extends DeepPartial<Entity>>(
    entities: T[] | T,
    options?: SaveOptions,
  ): Promise<T[] | T> {
    if (isArray(entities)) {
      return this._repository.save(entities, options);
    }
    return this._repository.save(entities, options);
  }

  delete(query: FindOptionsWhere<Entity>): Promise<UpdateResult> {
    return this._repository.softDelete(query);
  }

  findOneBy(where: FindOptionsWhere<Entity>): Promise<Entity | null> {
    return this._repository.findOneBy(where);
  }
}
