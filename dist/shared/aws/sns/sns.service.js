"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const config_1 = require("@nestjs/config");
const common_2 = require("@nestjs/common");
let SNSService = class SNSService {
    constructor(config) {
        this.config = config;
        this.logger = new common_2.Logger('AWS');
        this.region = this.config.get('AWS_REGION');
        this.accessKey = this.config.get('AWS_ACCESS_KEY_ID');
        this.secretKey = this.config.get('AWS_SECRET_ACCESS_KEY');
        this.topicArn = this.config.get('AWS_SNS_TOPIC_ARN');
        AWS.config.update({
            region: this.region,
            accessKeyId: this.accessKey,
            secretAccessKey: this.secretKey,
        });
        this.client = new AWS.SNS({
            region: this.region,
        });
    }
    async publish(payload, topicName) {
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
};
SNSService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SNSService);
exports.default = SNSService;
//# sourceMappingURL=sns.service.js.map