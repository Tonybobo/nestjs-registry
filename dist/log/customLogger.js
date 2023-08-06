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
const logs_service_1 = require("./logs.service");
const getLogLevel_1 = require("./utils/getLogLevel");
let CustomLogger = class CustomLogger extends common_1.ConsoleLogger {
    constructor(context, options, logsService) {
        const environment = process.env.NODE_ENV;
        super(context, {
            ...options,
            logLevels: (0, getLogLevel_1.getLogLevel)(environment === 'production'),
        });
        this.logsService = logsService;
    }
    log(message, context) {
        super.log.apply(this, [message, context]);
        this.logsService.createLog({
            message,
            context,
            level: 'log',
        });
    }
    error(message, stack, context) {
        super.error.apply(this, [message, stack, context]);
        this.logsService.createLog({
            message,
            context,
            level: 'error',
        });
    }
    warn(message, context) {
        super.warn.apply(this, [message, context]);
        this.logsService.createLog({
            message,
            context,
            level: 'error',
        });
    }
    debug(message, context) {
        super.debug.apply(this, [message, context]);
        this.logsService.createLog({
            context,
            level: 'error',
            message,
        });
    }
    verbose(message, context) {
        super.debug.apply(this, [message, context]);
        this.logsService.createLog({
            message,
            context,
            level: 'error',
        });
    }
};
CustomLogger = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String, Object, logs_service_1.default])
], CustomLogger);
exports.default = CustomLogger;
//# sourceMappingURL=customLogger.js.map