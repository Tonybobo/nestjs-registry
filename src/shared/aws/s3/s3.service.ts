import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { Logger as NestLogger } from '@nestjs/common';
import { Stream } from 'stream';
@Injectable({ scope: Scope.TRANSIENT })
export default class S3Service {
  private client: AWS.S3;
  private logger;
  private region: string;
  private accessKey: string;
  private secretKey: string;
  constructor(private config: ConfigService) {
    this.logger = new NestLogger('AWS');
    this.region = this.config.get<string>('AWS_REGION');
    this.accessKey = this.config.get<string>('AWS_ACCESS_KEY_ID');
    this.secretKey = this.config.get<string>('AWS_SECRET_ACCESS_KEY');
    AWS.config.update({
      region: this.region,
      accessKeyId: this.accessKey,
      secretAccessKey: this.secretKey,
    });
    this.client = new AWS.S3();
  }

  async upload(bucket: string, key: string, body: Stream, mimeType: string) {
    const params = {
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: mimeType,
    };
    const response = await this.client.upload(params).promise();
    this.logger.log(`Upload Response ${response}`);
    return response;
  }

  async get(bucket: string, key: string) {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    return this.client.getObject(params).promise();
  }
}
