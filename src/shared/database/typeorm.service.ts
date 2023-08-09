import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';
import DatabaseLogger from './databaseLogger';
import Log from 'src/log/log.entity';

type DbType = 'mysql' | 'mariadb' | 'postgres' | 'sqlite';
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions():
    | TypeOrmModuleOptions
    | Promise<TypeOrmModuleOptions> {
    return {
      type: this.config.get<DbType>('DATABASE_TYPE') ?? 'mysql',
      host: this.config.get<string>('DATABASE_HOST'),
      port: this.config.get<number>('DATABASE_PORT'),
      database: this.config.get<string>('DATABASE_NAME'),
      username: this.config.get<string>('DATABASE_USER'),
      password: this.config.get<string>('DATABASE_PASSWORD'),
      entities: [
        Log,
        join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          '..',
          '..',
          'dist/**/*.entity.{ts ,js}',
        ),
      ],
      migrations: [
        join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          '..',
          '..',
          'dist/**/*.entity.{ts , js}',
        ),
      ],
      migrationsTableName: 'typeorm_migrations',
      logger: new DatabaseLogger(),
      synchronize: true,
    };
  }
}
