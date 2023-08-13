"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ModuleLoaderModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleLoaderModule = exports.moduleLoaderFactory = void 0;
const common_1 = require("@nestjs/common");
const module_loader_defs_1 = require("./module-loader-defs");
const module_loader_service_1 = require("./module-loader.service");
const path = require("path");
const fg = require("fast-glob");
exports.moduleLoaderFactory = {
    provide: module_loader_defs_1.MODULE_LOADER,
    useFactory: (moduleLoaderService) => { },
    inject: [module_loader_service_1.ModuleLoaderService],
};
class InternalModuleLoader {
    static async loadModules(_options) {
        return new Promise((resolve) => {
            this.getModuleFileNames(_options).then((filePaths) => {
                if (filePaths.length === 0) {
                    resolve([]);
                }
                else {
                    const loadedModules = filePaths.map((filePath) => this.loadModule(filePath));
                    if (loadedModules.length === 0) {
                        resolve([]);
                    }
                    else {
                        const moduleInfo = [];
                        Promise.all(loadedModules).then((modules) => {
                            for (const module of modules) {
                                const moduleField = Object.keys(module).find((key) => key.indexOf('Module') >= 0);
                                if (moduleField) {
                                    moduleInfo.push({
                                        name: moduleField,
                                        module: module[moduleField],
                                    });
                                }
                            }
                            resolve(moduleInfo);
                        });
                    }
                }
            });
        });
    }
    static async loadModule(modulePath) {
        console.log(modulePath);
        return Promise.resolve(`${modulePath}`).then(s => require(s));
    }
    static async getModuleFileNames(_options) {
        const spec = (typeof _options.fileSpec === 'string'
            ? [_options.fileSpec]
            : _options.fileSpec).map((fileSpec) => path.join(_options.path, fileSpec));
        const options = {
            onlyFiles: true,
        };
        if (_options.depth) {
            options.deep = _options.depth < -1 ? Infinity : _options.depth;
        }
        if (_options.ignoreSpec) {
            options.ignore = Array.isArray(_options.ignoreSpec)
                ? _options.ignoreSpec
                : [_options.ignoreSpec];
        }
        this.logger.log(`**Module Loader FileSpec**: "${spec}"`);
        return fg(spec, options);
    }
}
InternalModuleLoader.logger = new common_1.Logger(InternalModuleLoader.name);
let ModuleLoaderModule = exports.ModuleLoaderModule = ModuleLoaderModule_1 = class ModuleLoaderModule {
    static async register(moduleLoaderOptions) {
        const moduleInfos = await InternalModuleLoader.loadModules(moduleLoaderOptions);
        const modules = moduleInfos.map((moduleInfo) => moduleInfo.module);
        const moduleNames = moduleInfos.map((moduleInfo) => moduleInfo.name);
        return {
            module: ModuleLoaderModule_1,
            imports: [...modules],
            providers: [
                {
                    provide: module_loader_defs_1.MODULE_LOADER_OPTIONS,
                    useValue: moduleLoaderOptions,
                },
                {
                    provide: module_loader_defs_1.MODULE_LOADER_NAMES,
                    useValue: moduleNames,
                },
                module_loader_service_1.ModuleLoaderService,
                exports.moduleLoaderFactory,
            ],
        };
    }
};
exports.ModuleLoaderModule = ModuleLoaderModule = ModuleLoaderModule_1 = __decorate([
    (0, common_1.Module)({})
], ModuleLoaderModule);
//# sourceMappingURL=module-loader.module.js.map