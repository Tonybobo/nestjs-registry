"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const env_helper_1 = require("./common/helper/env.helper");
const event_emitter_1 = require("@nestjs/event-emitter");
const path_1 = require("path");
const module_loader_module_1 = require("./module-loader/module-loader.module");
const path_2 = require("path");
const logs_middleware_1 = require("./middleware/logs.middleware");
const database_module_1 = require("./shared/database/database.module");
const log_module_1 = require("./log/log.module");
const envFilePath = (0, env_helper_1.getEnvPath)((0, path_1.join)(__dirname, '..', '..', '..', '..'));
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logs_middleware_1.default).forRoutes('*');
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath, isGlobal: true }),
            database_module_1.DatabaseModule,
            log_module_1.LoggerModule,
            event_emitter_1.EventEmitterModule.forRoot({ wildcard: true }),
            module_loader_module_1.ModuleLoaderModule.register({
                name: 'api-module',
                path: (0, path_2.resolve)((0, path_1.join)(__dirname, '..', '..', '..', '..', 'dist')),
                fileSpec: '**/*.js',
                ignoreSpec: ['typeorm'],
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map