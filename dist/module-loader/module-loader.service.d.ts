import { OnModuleInit } from '@nestjs/common';
import { IModuleLoaderOptions } from './module-loader-defs';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class ModuleLoaderService implements OnModuleInit {
    private _options;
    private _moduleNames;
    private eventEmitter;
    constructor(_options: IModuleLoaderOptions, _moduleNames: Array<string>, eventEmitter: EventEmitter2);
    onModuleInit(): void;
}
