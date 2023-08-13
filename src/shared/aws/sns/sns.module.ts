import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import SNSService from './sns.service';

@Module({
  imports: [ConfigModule],
  providers: [SNSService],
  exports: [SNSService],
})
export class AwsSNSModule {}
