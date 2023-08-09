import { DynamicModule, Module, Logger } from '@nestjs/common';
import {
  IModuleLoaderOptions,
  MODULE_LOADER,
  MODULE_LOADER_NAMES,
  MODULE_LOADER_OPTIONS,
} from './module-loader-defs';
import { ModuleLoaderService } from './module-loader.service';
import * as path from 'path';
import * as fg from 'fast-glob';

export const moduleLoaderFactory = {
  provide: MODULE_LOADER,
  useFactory: (moduleLoaderService: ModuleLoaderService) => {},
  inject: [ModuleLoaderService],
};

interface IModuleInfo {
  name: string;
  module: DynamicModule;
}

class InternalModuleLoader {
  static readonly logger = new Logger(InternalModuleLoader.name);

  static async loadModules(
    _options: IModuleLoaderOptions,
  ): Promise<Array<IModuleInfo>> {
    return new Promise((resolve) => {
      this.getModuleFileNames(_options).then((filePaths: Array<string>) => {
        if (filePaths.length === 0) {
          resolve([]);
        } else {
          const loadedModules: Array<Promise<any>> = filePaths.map((filePath) =>
            this.loadModule(filePath),
          );
          if (loadedModules.length === 0) {
            resolve([]);
          } else {
            const moduleInfo: Array<IModuleInfo> = [];
            Promise.all(loadedModules).then((modules: Array<any>) => {
              for (const module of modules) {
                const moduleField = Object.keys(module).find(
                  (key) => key.indexOf('Module') >= 0,
                );
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

  private static async loadModule(modulePath: string): Promise<any> {
    console.log(modulePath);
    return import(modulePath);
  }

  private static async getModuleFileNames(
    _options: IModuleLoaderOptions,
  ): Promise<Array<string>> {
    const spec: Array<string> = (
      typeof _options.fileSpec === 'string'
        ? [_options.fileSpec]
        : _options.fileSpec
    ).map((fileSpec) => path.join(_options.path, fileSpec));

    const options: fg.Options = {
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

@Module({})
export class ModuleLoaderModule {
  public static async register(
    moduleLoaderOptions: IModuleLoaderOptions,
  ): Promise<DynamicModule> {
    const moduleInfos = await InternalModuleLoader.loadModules(
      moduleLoaderOptions,
    );
    const modules = moduleInfos.map((moduleInfo) => moduleInfo.module);
    const moduleNames = moduleInfos.map((moduleInfo) => moduleInfo.name);

    return {
      module: ModuleLoaderModule,
      imports: [...modules],
      providers: [
        {
          provide: MODULE_LOADER_OPTIONS,
          useValue: moduleLoaderOptions,
        },
        {
          provide: MODULE_LOADER_NAMES,
          useValue: moduleNames,
        },
        ModuleLoaderService,
        moduleLoaderFactory,
      ],
    };
  }
}
