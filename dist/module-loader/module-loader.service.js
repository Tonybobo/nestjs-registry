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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleLoaderService = void 0;
const common_1 = require("@nestjs/common");
const module_loader_defs_1 = require("./module-loader-defs");
const event_emitter_1 = require("@nestjs/event-emitter");
const process_1 = require("process");
let ModuleLoaderService = exports.ModuleLoaderService = class ModuleLoaderService {
    constructor(_options, _moduleNames, eventEmitter) {
        this._options = _options;
        this._moduleNames = _moduleNames;
        this.eventEmitter = eventEmitter;
    }
    onModuleInit() {
        (0, process_1.nextTick)(() => {
            const eventName = module_loader_defs_1.EV_MODULE_DYN_LOADER + this._options.name;
            this.eventEmitter.emit(eventName, {
                name: this._options.name,
                moduleNames: this._moduleNames,
            });
        });
    }
};
exports.ModuleLoaderService = ModuleLoaderService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, common_1.Inject)(module_loader_defs_1.MODULE_LOADER_OPTIONS)),
    __param(1, (0, common_1.Inject)(module_loader_defs_1.MODULE_LOADER_NAMES)),
    __metadata("design:paramtypes", [Object, Array,
        event_emitter_1.EventEmitter2])
], ModuleLoaderService);
//# sourceMappingURL=module-loader.service.js.map