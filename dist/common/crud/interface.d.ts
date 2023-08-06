import { DeepPartial, FindOptionsWhere, ObjectLiteral, FindOneOptions, SaveOptions, UpdateResult } from 'typeorm';
export declare abstract class IGenericRepository<Entity extends ObjectLiteral> {
    abstract findAll(query?: FindOptionsWhere<Entity>): Promise<Entity[]>;
    abstract findOne(query?: FindOneOptions<Entity>): Promise<Entity>;
    abstract findOneBy(where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): Promise<Entity | null>;
    abstract save<T extends DeepPartial<Entity>>(entities: T[] | T, options?: SaveOptions): Promise<T[] | T>;
    abstract delete(query: FindOptionsWhere<Entity>): Promise<UpdateResult>;
}
