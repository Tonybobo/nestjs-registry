/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { Stream } from 'stream';
export default class S3Service {
    private config;
    private client;
    private logger;
    private region;
    private accessKey;
    private secretKey;
    constructor(config: ConfigService);
    upload(bucket: string, key: string, body: Stream, mimeType: string): Promise<AWS.S3.ManagedUpload.SendData>;
    get(bucket: string, key: string): Promise<import("aws-sdk/lib/request").PromiseResult<AWS.S3.GetObjectOutput, AWS.AWSError>>;
}
