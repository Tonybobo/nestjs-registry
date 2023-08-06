import { DeepPartial, FindOneOptions, FindOptionsWhere, Repository, SaveOptions, UpdateResult } from 'typeorm';
import { IGenericRepository } from './interface';
export declare class BaseRepository<Entity> implements IGenericRepository<Entity> {
    private _repository;
    constructor(repository: Repository<Entity>);
    findAll(query?: FindOptionsWhere<Entity>): Promise<Entity[]>;
    findOne(query?: FindOneOptions<Entity>): Promise<Entity>;
    save<T extends DeepPartial<Entity>>(entities: T[] | T, options?: SaveOptions): Promise<T[] | T>;
    delete(query: FindOptionsWhere<Entity>): Promise<UpdateResult>;
    findOneBy(where: FindOptionsWhere<Entity>): Promise<Entity | null>;
}
