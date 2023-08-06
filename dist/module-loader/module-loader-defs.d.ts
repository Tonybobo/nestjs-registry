export declare const MODULE_LOADER_OPTIONS = "MODULE_LOADER_OPTIONS";
export declare const MODULE_LOADER_NAMES = "MODULE_LOADER_NAMES";
export declare const MODULE_LOADER = "MODULE_LOADER";
export declare const EV_MODULE_DYN_LOADER = "EV_MODULE_DYN_LOADER";
export interface IModuleLoaderOptions {
    name: string;
    path: string;
    depth?: number;
    fileSpec?: string | Array<string>;
    ignoreSpec?: string | Array<string>;
}
export interface IModuleDynLoaderEvent {
    name: string;
    moduleNames?: Array<string>;
    error?: Error | string;
}
