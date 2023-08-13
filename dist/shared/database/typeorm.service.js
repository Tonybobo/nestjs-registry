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
exports.TypeOrmConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const databaseLogger_1 = require("./databaseLogger");
const log_entity_1 = require("../../log/log.entity");
let TypeOrmConfigService = exports.TypeOrmConfigService = class TypeOrmConfigService {
    createTypeOrmOptions() {
        return {
            type: this.config.get('DATABASE_TYPE') ?? 'mysql',
            host: this.config.get('DATABASE_HOST'),
            port: this.config.get('DATABASE_PORT'),
            database: this.config.get('DATABASE_NAME'),
            username: this.config.get('DATABASE_USER'),
            password: this.config.get('DATABASE_PASSWORD'),
            entities: [
                log_entity_1.default,
                (0, path_1.join)(__dirname, '..', '..', '..', '..', '..', '..', 'dist/**/*.entity.{ts ,js}'),
            ],
            migrations: [
                (0, path_1.join)(__dirname, '..', '..', '..', '..', '..', '..', 'dist/**/*.entity.{ts , js}'),
            ],
            migrationsTableName: 'typeorm_migrations',
            logger: new databaseLogger_1.default(),
            synchronize: true,
        };
    }
};
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], TypeOrmConfigService.prototype, "config", void 0);
exports.TypeOrmConfigService = TypeOrmConfigService = __decorate([
    (0, common_1.Injectable)()
], TypeOrmConfigService);
//# sourceMappingURL=typeorm.service.js.map