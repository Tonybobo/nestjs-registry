import { AppService } from './app.service';
import SNSService from './shared/aws/sns/sns.service';
import S3Service from './shared/aws/s3/s3.service';
export declare class AppController {
    private readonly appService;
    private readonly sns;
    private readonly s3;
    constructor(appService: AppService, sns: SNSService, s3: S3Service);
    getHello(): string;
}
