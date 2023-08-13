import { ConfigService } from '@nestjs/config';
export default class SNSService {
    private config;
    private client;
    private region;
    private accessKey;
    private secretKey;
    private topicArn;
    private logger;
    constructor(config: ConfigService);
    publish(payload: any, topicName: string): Promise<{
        MessageId: string;
        Sequence: string;
    }>;
}
