import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Log from './log.entity';
import LogService from './logs.service';
import { ConfigModule } from '@nestjs/config';
import LogsRepository from './log.dao';
import CustomLogger from './customLogger';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Log])],
  providers: [LogService, LogsRepository, CustomLogger],
  exports: [CustomLogger],
})
export class LoggerModule {}
