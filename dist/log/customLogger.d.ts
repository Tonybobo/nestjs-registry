import { ConsoleLogger, ConsoleLoggerOptions } from '@nestjs/common';
import LogService from './logs.service';
declare class CustomLogger extends ConsoleLogger {
    private readonly logsService;
    constructor(context: string, options: ConsoleLoggerOptions, logsService: LogService);
    log(message: any, context?: string): void;
    error(message: any, stack?: string, context?: string): void;
    warn(message: any, context?: string): void;
    debug(message: string, context?: string): void;
    verbose(message: any, context?: string): void;
}
export default CustomLogger;
