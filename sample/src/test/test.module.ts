import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './test.entity';
import { TestRepository } from './test.dao';
import { TestService } from './test.service';
import { Module } from '@nestjs/common';
import { TestController } from './test.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  controllers: [TestController],
  providers: [TestRepository, TestService],
})
export class TestModule {}
