import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions():
    | TypeOrmModuleOptions
    | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: this.config.get<string>('DATABASE_HOST'),
      port: this.config.get<number>('DATABASE_PORT'),
      database: this.config.get<string>('DATABASE_NAME'),
      username: this.config.get<string>('DATABASE_USER'),
      password: this.config.get<string>('DATABASE_PASSWORD'),
      entities: [
        join(__dirname, '..', '..', '..', '..', 'src/**/*.entity.{ts,js}'),
        join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          'sample/dist/sample/src/**/*.entity.{ts ,js}',
        ),
      ],
      migrations: [
        'dist/**/*.entity.{ts,js}',
        join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          'dist',
          'sample/src/**/*.entity.{ts , js}',
        ),
      ],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true,
    };
  }
}
