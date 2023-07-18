import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { join } from 'path';
import { ModuleLoaderModule } from './module-loader/module-loader.module';
import { resolve } from 'path';
import LogsMiddleware from './middleware/logs.middleware';

const envFilePath: string =
  process.env.NODE_ENV === 'dev'
    ? getEnvPath(join(__dirname, '..', '..', 'sample'))
    : getEnvPath(join(__dirname, '..', '..'));

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    EventEmitterModule.forRoot({ wildcard: true }),
    ModuleLoaderModule.register({
      name: 'api-module',
      path: resolve(
        join(__dirname, '..', '..', 'src'),
        join(__dirname, '..', '..', 'sample', 'dist'),
      ),
      fileSpec: '**/*.js',
      ignoreSpec: ['typeorm'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
