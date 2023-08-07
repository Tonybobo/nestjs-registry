import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { join } from 'path';
import { ModuleLoaderModule } from './module-loader/module-loader.module';
import { resolve } from 'path';
import LogsMiddleware from './middleware/logs.middleware';
import { DatabaseModule } from './shared/database/database.module';
import { LoggerModule } from './log/log.module';

const envFilePath: string = getEnvPath(join(__dirname, '..', '..', '..'));
console.log(envFilePath);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    DatabaseModule,
    LoggerModule,
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
