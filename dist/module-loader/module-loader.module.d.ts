import { DynamicModule } from '@nestjs/common';
import { IModuleLoaderOptions } from './module-loader-defs';
import { ModuleLoaderService } from './module-loader.service';
export declare const moduleLoaderFactory: {
    provide: string;
    useFactory: (moduleLoaderService: ModuleLoaderService) => void;
    inject: (typeof ModuleLoaderService)[];
};
export declare class ModuleLoaderModule {
    static register(moduleLoaderOptions: IModuleLoaderOptions): Promise<DynamicModule>;
}
