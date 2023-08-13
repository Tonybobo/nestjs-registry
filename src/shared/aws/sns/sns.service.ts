import { Injectable, Scope } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Logger as NestLogger } from '@nestjs/common';
@Injectable({ scope: Scope.TRANSIENT })
export default class SNSService {
  private client: AWS.SNS;
  private region: string;
  private accessKey: string;
  private secretKey: string;
  private topicArn: string;
  private logger;
  constructor(private config: ConfigService) {
    this.logger = new NestLogger('AWS');
    this.region = this.config.get<string>('AWS_REGION');
    this.accessKey = this.config.get<string>('AWS_ACCESS_KEY_ID');
    this.secretKey = this.config.get<string>('AWS_SECRET_ACCESS_KEY');
    this.topicArn = this.config.get<string>('AWS_SNS_TOPIC_ARN');
    AWS.config.update({
      region: this.region,
      accessKeyId: this.accessKey,
      secretAccessKey: this.secretKey,
    });
    this.client = new AWS.SNS({
      region: this.region,
    });
  }

  async publish(payload: any, topicName: string) {
    const param = {
      Message: JSON.stringify(payload),
      TopicArn: `${this.topicArn}:${topicName}`,
    };
    const response = await this.client.publish(param).promise();
    this.logger.log(`Message ${param.Message} sent to topic ${topicName}`);
    this.logger.log(`MessageId is ${response.MessageId}`);
    return {
      MessageId: response.MessageId,
      Sequence: response.SequenceNumber,
    };
  }
}
